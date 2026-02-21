#!/usr/bin/env python3
"""Remove backgrounds from product images using rembg."""

import os
from pathlib import Path
from rembg import remove
from PIL import Image
import io

INPUT_DIR = Path("/Users/younesouasmi/Documents/dev/remotion/public/kech-waffles")
OUTPUT_DIR = INPUT_DIR  # Overwrite in place with PNG

SKIP = {"TransparentWhite.png"}  # Don't process the logo

for img_path in INPUT_DIR.iterdir():
    if img_path.name in SKIP:
        continue
    if img_path.suffix.lower() not in (".png", ".jpg", ".jpeg"):
        continue

    print(f"Processing: {img_path.name}...", end=" ", flush=True)

    with open(img_path, "rb") as f:
        input_data = f.read()

    output_data = remove(input_data)

    # Save as PNG (to support transparency)
    output_name = img_path.stem + ".png"
    output_path = OUTPUT_DIR / output_name

    # Open and save to ensure proper format
    img = Image.open(io.BytesIO(output_data))
    img.save(output_path, "PNG")

    # Remove old JPG if we converted to PNG
    if img_path.suffix.lower() in (".jpg", ".jpeg") and img_path.exists():
        img_path.unlink()

    print(f"Done -> {output_name}")

print("\nAll images processed!")
