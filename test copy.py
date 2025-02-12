import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Rectangle
from matplotlib.lines import Line2D
from bs4 import BeautifulSoup


# --- DRAWING FUNCTIONS ---
def draw_oxer(ax, x, y):
    """Draw an oxer with black and white vertical striped blocks."""
    for i in range(6):
        color = "black" if i % 2 == 0 else "white"
        rect = Rectangle((-0.5 + x, -20 + i * 6.67 + y), 1,
                         6.67, color=color, edgecolor="black")
        ax.add_patch(rect)
    # Draw arrow for direction
    ax.arrow(x - 18, y, 30, 0, head_width=2,
             head_length=3, fc="black", ec="black")


def draw_vertical(ax, x, y):
    """Draw a vertical jump."""
    for i in range(6):
        color = "black" if i % 2 == 0 else "white"
        rect = Rectangle((x - 1, y - 20 + i * 6.67), 2, 6.67,
                         facecolor=color, edgecolor="black")
        ax.add_patch(rect)


def draw_liverpool(ax, x, y):
    """Draw Liverpool jump."""
    rect = Rectangle((x - 7.5, y - 15), 15, 30,
                     color="blue", edgecolor="black")
    ax.add_patch(rect)


def draw_judge_box(ax, x, y):
    """Draw judge's box with a label."""
    box = Rectangle((x - 10, y - 20), 20, 40, color="white", edgecolor="black")
    ax.add_patch(box)
    ax.text(x, y, "Jury", fontsize=12, ha="center", va="center", rotation=90)


def draw_wall(ax, x, y):
    """Draw a wall obstacle."""
    wall = Polygon([[x - 4, y - 20], [x + 4, y - 20], [x + 4, y + 20],
                   [x - 4, y + 20]], closed=True, facecolor="red")
    ax.add_patch(wall)


def draw_start_finish_line(ax, x1, y1, x2, y2, label):
    """Draw start or finish line with flags."""
    ax.plot([x1, x2], [y1, y2], linestyle="--", color="black", linewidth=1)
    ax.add_patch(Polygon([[x1, y1], [x1 + 10, y1 + 10], [x1 + 10, y1 - 10]],
                 closed=True, facecolor="white", edgecolor="black"))
    ax.add_patch(Polygon([[x2, y2], [x2 + 10, y2 + 10], [x2 + 10,
                 y2 - 10]], closed=True, facecolor="red", edgecolor="black"))
    mid_x, mid_y = (x1 + x2) / 2, (y1 + y2) / 2
    ax.text(mid_x, mid_y, label, fontsize=10, ha="center")


# --- PARSING FUNCTION ---
def parse_html_and_draw(filepath):
    """Parse the input HTML file to draw the course layout."""
    with open(filepath, "r") as file:
        soup = BeautifulSoup(file.read(), "html.parser")

    fig, ax = plt.subplots(figsize=(12, 8))
    ax.set_xlim(-200, 200)
    ax.set_ylim(-200, 200)
    ax.set_aspect("equal")
    ax.axis("off")

    # Process each obstacle type
    for element in soup.find_all("g"):
        element_id = element.get("id", "")
        type = element.get("type", "")

        # Extract positional data
        line = element.find("line")
        polygon = element.find("polygon")
        
        if line is not None and polygon is not None:
            x = float(line["x1"]) if line else float(polygon["x"])
            y = float(line["y1"]) if line else float(polygon["y"])
            print(type, x, y)
        # Draw based on element type
        if "jump" in element_id:  # Vertical or Wall

            draw_vertical(ax, x, y)

        elif "Wall" in type:

            draw_wall(ax, x, y)

        elif "Oxer" in type:  # Oxer
            draw_oxer(ax, x, y)

        # elif "Liverpool" in type:  # Liverpool
        #     draw_liverpool(ax, x, y)

        # elif "judge" in element_id or "jury" in element_id:  # Judge Box
        #     draw_judge_box(ax, x, y)

        # elif "start" in element_id:  # Start Line
        #     x1, y1 = map(float, line["x1"]), map(float, line["y1"])
        #     x2, y2 = map(float, line["x2"]), map(float, line["y2"])
        #     draw_start_finish_line(ax, x1, y1, x2, y2, "Start")

        # elif "finish" in element_id:  # Finish Line
        #     x1, y1 = map(float, line["x1"]), map(float, line["y1"])
        #     x2, y2 = map(float, line["x2"]), map(float, line["y2"])
        #     draw_start_finish_line(ax, x1, y1, x2, y2, "Finish")

    plt.show()


# --- MAIN PROGRAM ---
html_file = "data.txt"  # Change to the correct file path
parse_html_and_draw(html_file)
