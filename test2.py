import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import re

# Step 1: Scrape the HTML content
url = 'https://www.strides.co.nz/course_plans.php?id=2172'  # Replace with the actual URL
response = requests.get(url)
html_content = response.content

# Step 2: Parse the HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Extract the SVG elements
svg_elements = soup.find_all('svg')

# Step 3: Draw the plot
fig, ax = plt.subplots()

# Define a function to parse and draw SVG elements
def draw_svg_element(svg):
    # Extract attributes from the SVG element
    width = float(svg.get('width', 0))
    height = float(svg.get('height', 0))
    viewBox = svg.get('viewBox', '0 0 0 0').split()
    viewBox = list(map(float, viewBox))

    # Draw a rectangle for the SVG element
    rect = patches.Rectangle((viewBox[0], viewBox[1]), viewBox[2], viewBox[3], linewidth=1, edgecolor='r', facecolor='none')
    ax.add_patch(rect)

    # Parse and draw child elements (e.g., lines, circles, etc.)
    for child in svg.find_all():
        if child.name == 'line':
            x1 = float(child.get('x1', 0))
            y1 = float(child.get('y1', 0))
            x2 = float(child.get('x2', 0))
            y2 = float(child.get('y2', 0))
            line = patches.FancyArrowPatch((x1, y1), (x2, y2), connectionstyle="arc3,rad=.2", arrowstyle='-|>', color='b')
            ax.add_patch(line)
        elif child.name == 'circle':
            cx = float(child.get('cx', 0))
            cy = float(child.get('cy', 0))
            r = float(child.get('r', 0))
            circle = patches.Circle((cx, cy), r, linewidth=1, edgecolor='g', facecolor='none')
            ax.add_patch(circle)
        elif child.name == 'rect':
            x = float(child.get('x', 0))
            y = float(child.get('y', 0))
            width = float(child.get('width', 0))
            height = float(child.get('height', 0))
            rect = patches.Rectangle((x, y), width, height, linewidth=1, edgecolor='r', facecolor='none')
            ax.add_patch(rect)
        elif child.name == 'polygon':
            points_str = child.get('points', '')
            # Use regex to split by comma or space, and handle negative numbers correctly
            points_str = re.sub(r'([+-]?\d+)(?=[+-])', r'\1,', points_str)
            points = [float(point) for point in re.split(r'[, ]+', points_str.strip())]
            points = [(points[i], points[i+1]) for i in range(0, len(points), 2)]
            polygon = patches.Polygon(points, closed=True, linewidth=1, edgecolor='k', facecolor='none')
            ax.add_patch(polygon)
        elif child.name == 'text':
            x = float(child.get('x', 0))
            y = float(child.get('y', 0))
            text = child.get_text()
            ax.text(x, y, text, fontsize=12, color='k', ha='center', va='center')

# Draw each SVG element
for svg in svg_elements:
    draw_svg_element(svg)

# Set the limits and aspect of the plot to be equal
ax.set_xlim(0, 1107)
ax.set_ylim(800, 0)  # Reverse the y-axis
ax.set_aspect('equal')

# Show the plot
plt.show()
