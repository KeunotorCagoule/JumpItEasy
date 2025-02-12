import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Rectangle, FancyArrow, FancyBboxPatch
from matplotlib.lines import Line2D


def draw_oxer(ax):
    """Draw an oxer element consisting of two vertical posts and alternating black/white sections."""
    # Function to create striped vertical blocks
    def striped_block(x_offset):
        for i in range(6):
            color = "black" if i % 2 == 0 else "white"
            rect = Rectangle((x_offset - 0.5, -20 + i * 6.67),
                             1, 6.67, color=color, edgecolor="black")
            ax.add_patch(rect)
        border = Polygon([[-2+x_offset, -30], [-2+x_offset, 30], [2+x_offset, 30], [2+x_offset, -30]],
                         closed=True, fill=False, edgecolor="black")
        ax.add_patch(border)

    striped_block(-6)
    striped_block(6)
    ax.arrow(-18, 0, 30, 0, head_width=2, head_length=3,
             fc='black', ec='black')  # Arrow


def draw_vertical(ax):
    """Draw a vertical striped block."""
    for i in range(6):
        color = "black" if i % 2 == 0 else "white"
        rect = Rectangle((-1, -20 + i * 6.67), 2, 6.67,
                         color=color, edgecolor="black")
        ax.add_patch(rect)


def draw_liverpool(ax):
    """Draw the Liverpool rectangular block."""
    rect = Rectangle((-7.5, -15), 15, 30, color="blue")
    ax.add_patch(rect)


def draw_judge_box(ax):
    """Draw a judge box with text 'Jury' rotated 90 degrees."""
    rect = Rectangle((-10, -20), 20, 40, color="white",
                     edgecolor="black", linewidth=1)
    ax.add_patch(rect)
    ax.text(0, 0, "Jury", fontsize=12, fontweight="bold",
            rotation=90, va="center", ha="center")


def draw_wall(ax):
    """Draw a wall block with red fill and dividing white gridlines."""
    wall = Polygon([[-2, -20], [-4, -20], [-4, -30], [4, -30], [4, -20],
                    [2, -20], [2, 20], [4, 20], [4, 30], [-4, 30],
                    [-4, 20], [-2, 20]],
                   closed=True, facecolor="darkred", edgecolor="black")
    ax.add_patch(wall)
    # Adding vertical grid lines
    for x in [-2, 0, 2]:
        ax.plot([x, x], [-30, 30], color="white", linewidth=0.5)
    # Adding small horizontal segments
    for y in [-27.5, -22.5, 25]:
        ax.plot([-4, -2], [y, y], color="white", linewidth=0.5)
    for y in range(-25, 31, 5):
        ax.plot([-2, 0], [y, y], color="white", linewidth=0.5)


def draw_start_line(ax):
    """Start line with dashed line and flags."""
    ax.plot([0, -128], [0, -169], linestyle="--", color="black", linewidth=1)
    # Draw the flags
    ax.add_patch(Polygon([[0, 0], [10, 10], [0, 20], [0, 0]],
                 closed=True, facecolor="white", edgecolor="black"))
    ax.add_patch(Polygon([[-128, -169], [-118, -159], [-128, -149], [-128, -169]],
                         closed=True, facecolor="red", edgecolor="black"))
    # Add text
    ax.text(-79, -82, "Start", fontsize=10, color="black", ha="center")


def draw_finish_line(ax):
    """Finish line with dashed line and flags."""
    ax.plot([0, -51], [0, -144], linestyle="--", color="black", linewidth=1)
    # Draw the flags
    ax.add_patch(Polygon([[0, 0], [10, 10], [0, 20], [0, 0]],
                 closed=True, facecolor="white", edgecolor="black"))
    ax.add_patch(Polygon([[-51, -144], [-41, -134], [-51, -124], [-51, -144]],
                         closed=True, facecolor="red", edgecolor="black"))
    # Add text
    ax.text(-40.5, -69.5, "Finish", fontsize=10, color="black", ha="center")


def main():
    fig, ax = plt.subplots(1, 7, figsize=(20, 5))


    # Adjust axes range to ensure visibility
    for axis in ax:
        axis.set_xlim(-150, 50)
        axis.set_ylim(-180, 50)
        axis.set_aspect('equal')
        axis.axis('off')


    # Draw each element
    draw_oxer(ax[0])
    draw_vertical(ax[1])
    draw_liverpool(ax[2])
    draw_judge_box(ax[3])
    draw_wall(ax[4])
    draw_start_line(ax[5])  # Start Line
    draw_finish_line(ax[6])  # Finish Line

    # Titles for each section
    ax[0].set_title("Oxer")
    ax[1].set_title("Vertical")
    ax[2].set_title("Liverpool")
    ax[3].set_title("Judge Box")
    ax[4].set_title("Wall")
    ax[5].set_title("Start Line")
    ax[6].set_title("Finish Line")

    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()
