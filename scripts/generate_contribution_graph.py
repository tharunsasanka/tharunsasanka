"""Fetch the public GitHub contribution calendar via GraphQL and render an SVG. No fabricated counts."""
import json
import os
from pathlib import Path
from urllib.request import Request, urlopen
from xml.sax.saxutils import escape

username = os.environ.get("GITHUB_USERNAME", "tharunsasanka")
token = os.environ["GH_TOKEN"]
query = "query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount color}}}}}}"
body = json.dumps({"query": query, "variables": {"login": username}}).encode()
req = Request("https://api.github.com/graphql", data=body, headers={
    "Authorization": f"Bearer {token}", "Content-Type": "application/json",
    "User-Agent": "readme-contribution-graph"}, method="POST")
with urlopen(req, timeout=30) as response:
    data = json.load(response)
if data.get("errors"):
    raise RuntimeError(data["errors"])
weeks = data["data"]["user"]["contributionsCollection"]["contributionCalendar"]["weeks"]
if not weeks: raise RuntimeError("GitHub returned no contribution calendar weeks")
cell = 12; gap = 3; left = 55; top = 54
width = max(770, left + len(weeks) * (cell + gap) + 24)
height = 207
svg = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">',
       f'<rect width="{width}" height="{height}" rx="12" fill="#081726" stroke="#14566d"/>',
       '<text x="25" y="31" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#00e5ff">GITHUB CONTRIBUTIONS</text>',
       '<text x="25" y="192" font-family="Arial,sans-serif" font-size="12" fill="#b6cdd5">Verified contribution calendar from GitHub • Updated automatically</text>']
for col, week in enumerate(weeks):
    for day_index, day in enumerate(week["contributionDays"]):
        # GraphQL weeks are Sun-Sat in order. Use documented GitHub color for each square.
        color = day["color"]
        if not isinstance(color, str) or not color.startswith("#") or len(color) != 7:
            color = "#132b3a"
        x = left + col * (cell + gap); y = top + day_index * (cell + gap)
        svg.append(f'<rect x="{x}" y="{y}" width="{cell}" height="{cell}" rx="2" fill="{escape(color)}"><title>{escape(day["date"])}: {int(day["contributionCount"])} contributions</title></rect>')
svg.append('</svg>')
out = Path('assets/contribution-graph.svg'); out.parent.mkdir(exist_ok=True)
out.write_text('\n'.join(svg), encoding='utf-8')
print(f"Wrote {out}: {len(weeks)} weeks of verified GitHub activity")
