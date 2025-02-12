import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle, Polygon
import numpy as np

# Define course dimensions (scaled to 90x35 meters)
field_width = 90
field_height = 35

# Example data for obstacles
obstacles = [
    {"id": "1", "x": 15, "y": 20, "type": "vertical", "rotation": 45},
    {"id": "2", "x": 75, "y": 30, "type": "vertical", "rotation": 90},
    {"id": "3", "x": 60, "y": 15, "type": "oxer", "rotation": 135},
    {"id": "4", "x": 40, "y": 25, "type": "vertical", "rotation": 45},
    {"id": "5", "x": 10, "y": 10, "type": "oxer", "rotation": 135},
    {"id": "6", "x": 15, "y": 5, "type": "double", "rotation": 0},
    {"id": "7", "x": 60, "y": 5, "type": "vertical", "rotation": 0},
    {"id": "8", "x": 55, "y": 20, "type": "oxer", "rotation": 90},
    {"id": "9A", "x": 30, "y": 30, "type": "double", "rotation": 0},
    {"id": "9B", "x": 35, "y": 30, "type": "double", "rotation": 0},
    {"id": "10", "x": 85, "y": 15, "type": "vertical", "rotation": 45},
]

# Start and Finish coordinates
start_line = {"x": 5, "y": 17.5}
finish_line = {"x": 85, "y": 17.5}

# Create the plot
fig, ax = plt.subplots(figsize=(12, 6))

# Draw the field boundary
ax.set_xlim(0, field_width)
ax.set_ylim(0, field_height)
ax.set_aspect("equal", adjustable="datalim")
ax.add_patch(Rectangle((0, 0), field_width, field_height, edgecolor="black", fill=False, lw=2))

# Plot Start and Finish
ax.annotate("Start", (start_line["x"], start_line["y"]), color="green", fontsize=10, weight="bold")
ax.annotate("Finish", (finish_line["x"], finish_line["y"]), color="red", fontsize=10, weight="bold")

# Draw obstacles
for obstacle in obstacles:
    x, y, obs_type, rotation = obstacle["x"], obstacle["y"], obstacle["type"], obstacle["rotation"]
    color = "black" if obs_type == "vertical" else "blue"
    length = 2 if obs_type != "double" else 4  # Double is longer
    dx = np.cos(np.radians(rotation)) * length
    dy = np.sin(np.radians(rotation)) * length

    # Draw obstacle
    ax.plot([x, x + dx], [y, y + dy], color=color, lw=2)
    ax.text(x, y, obstacle["id"], fontsize=8, ha="center", va="center", bbox=dict(boxstyle="circle,pad=0.3", facecolor="white"))

# Add gridlines
ax.grid(True, which="both", linestyle="--", linewidth=0.5, color="gray")

# Title and labels
plt.title("Recreated Horse Trials Course")
plt.xlabel("Width (meters)")
plt.ylabel("Height (meters)")
plt.show()
