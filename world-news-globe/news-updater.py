#!/usr/bin/env python3
import html
import json
import re
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent
NEWS_FILE = ROOT / "news.json"
META_FILE = ROOT / "news-meta.json"

# Google News RSS is free and does not require an API key.
# Each feed is mapped to a globe location so country/region/city views keep working.
FEEDS = [
    ("IN", "WB", "Kolkata", "Kolkata news"),
    ("IN", "WB", None, "West Bengal India news"),
    ("IN", "WB", "Malda", "Malda West Bengal news"),
    ("IN", "WB", "Raiganj", "Raiganj Uttar Dinajpur West Bengal news"),
    ("IN", "WB", "Siliguri", "Siliguri West Bengal news"),
    ("IN", None, None, "India news"),
    ("US", "CA", "Los Angeles", "Los Angeles news"),
    ("US", "NY", "New York", "New York news"),
    ("US", "CA", None, "California USA news"),
    ("US", None, None, "United States news"),
    ("GB", "ENG", "London", "London UK news"),
    ("GB", "ENG", None, "United Kingdom news"),
    ("FR", "IDF", "Paris", "Paris France news"),
    ("DE", None, "Berlin", "Berlin Germany news"),
    ("JP", "TOK", "Tokyo", "Tokyo Japan news"),
    ("CN", None, "Beijing", "Beijing China news"),
    ("AU", "NSW", "Sydney", "Sydney Australia news"),
    ("BR", "SP", "São Paulo", "Sao Paulo Brazil news"),
    ("CA", None, "Toronto", "Toronto Canada news"),
    ("ZA", None, "Johannesburg", "Johannesburg South Africa news"),
    (None, None, None, "world latest news"),
]

FALLBACK_IMAGES = {
    "IN": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
    "US": "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=80",
    "GB": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    "FR": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    "DE": "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=1200&q=80",
    "JP": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    "CN": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    "AU": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    "BR": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80",
    "CA": "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80",
    "ZA": "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?auto=format&fit=crop&w=1200&q=80",
}
FALLBACK = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"

UA = "Mozilla/5.0 (compatible; WorldLensNewsBot/1.0; +https://github.com/bishnu7798/bishnu-portfolio)"

def clean_text(value):
    value = html.unescape(value or "")
    value = re.sub(r"<[^>]+>", " ", value)
    value = re.sub(r"\\s+", " ", value)
    return value.strip()

def image_from_html(value):
    if not value:
        return ""
    value = html.unescape(value)
    patterns = [
        r'<img[^>]+src=["\']([^"\']+)',
        r'<img[^>]+src=([^\\s>]+)',
    ]
    for pattern in patterns:
        m = re.search(pattern, value, re.I)
        if m:
            url = m.group(1).strip().replace("&amp;", "&")
            if url.startswith("http"):
                return url
    return ""

def parse_date(value):
    if not value:
        return datetime.now(timezone.utc)
    try:
        return parsedate_to_datetime(value).astimezone(timezone.utc)
    except Exception:
        try:
            return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc)
        except Exception:
            return datetime.now(timezone.utc)

def fetch_feed(country, region, city, query):
    params = urllib.parse.urlencode({
        "q": query,
        "hl": "en-IN",
        "gl": "IN",
        "ceid": "IN:en",
    })
    url = "https://news.google.com/rss/search?" + params
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=25) as response:
        return response.read(), (country, region, city, query)

def parse_feed(raw, mapping):
    country, region, city, query = mapping
    root = ET.fromstring(raw)
    items = []
    for item in root.findall(".//item"):
        title = clean_text(item.findtext("title", ""))
        link = item.findtext("link", "").strip()
        description_raw = item.findtext("description", "")
        description = clean_text(description_raw)
        source_node = item.find("source")
        source = clean_text(source_node.text if source_node is not None else "Google News")
        pub = item.findtext("pubDate", "")
        dt = parse_date(pub)

        # RSS descriptions from Google News frequently contain the article thumbnail.
        image = image_from_html(description_raw)
        if not image:
            for child in list(item):
                tag = child.tag.lower()
                if tag.endswith("content") or tag.endswith("thumbnail") or tag.endswith("enclosure"):
                    image = child.attrib.get("url", "")
                    if image:
                        break

        # Google News sometimes returns a short snippet. Keep it useful but compact.
        if len(description) > 420:
            description = description[:417].rsplit(" ", 1)[0] + "..."

        items.append({
            "country": country,
            "region": region,
            "city": city,
            "title": title,
            "description": description or title,
            "image": image or FALLBACK_IMAGES.get(country, FALLBACK),
            "source": source or "Google News",
            "publishedAt": dt.isoformat(),
            "category": infer_category(title + " " + description),
            "url": link,
        })
    return items

def infer_category(text):
    t = text.lower()
    rules = [
        ("SPORTS", ["sport", "football", "cricket", "tennis", "olympic", "match", "league"]),
        ("TECHNOLOGY", ["technology", "tech", "ai ", "artificial intelligence", "software", "cyber", "digital"]),
        ("SCIENCE", ["science", "space", "nasa", "research", "climate", "health", "medical"]),
        ("BUSINESS", ["business", "market", "economy", "stock", "trade", "company", "finance"]),
        ("POLITICS", ["election", "government", "minister", "president", "prime minister", "parliament", "politic"]),
        ("WEATHER", ["weather", "storm", "rain", "cyclone", "hurricane", "flood", "heatwave"]),
        ("ENTERTAINMENT", ["movie", "film", "music", "actor", "actress", "celebrity", "entertainment"]),
    ]
    for category, words in rules:
        if any(word in t for word in words):
            return category
    return "NEWS"

def main():
    all_items = []
    for mapping in FEEDS:
        try:
            raw, info = fetch_feed(*mapping)
            all_items.extend(parse_feed(raw, info))
        except Exception as exc:
            print("Feed failed:", mapping[3], exc)

    # Remove duplicates by normalized title and keep newest copy.
    unique = {}
    for item in all_items:
        key = re.sub(r"[^a-z0-9]+", "", item["title"].lower())
        if not key:
            continue
        old = unique.get(key)
        if old is None or item["publishedAt"] > old["publishedAt"]:
            unique[key] = item

    items = sorted(unique.values(), key=lambda x: x["publishedAt"], reverse=True)[:120]

    # Mark very recent stories as breaking for the UI.
    now = datetime.now(timezone.utc)
    for i, item in enumerate(items):
        try:
            age = (now - datetime.fromisoformat(item["publishedAt"])).total_seconds()
            item["breaking"] = age <= 3 * 3600
        except Exception:
            item["breaking"] = False
        item["id"] = f"live-{i+1:03d}"

    # If a transient RSS outage happens, never destroy the last working news file.
    if len(items) < 5 and NEWS_FILE.exists():
        print("Too few stories; keeping previous news.json")
        return

    NEWS_FILE.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    META_FILE.write_text(json.dumps({
        "updatedAt": now.isoformat(),
        "provider": "Google News RSS",
        "storyCount": len(items),
        "refresh": "Every 6 hours via GitHub Actions"
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(items)} live stories at {now.isoformat()}")

if __name__ == "__main__":
    main()
