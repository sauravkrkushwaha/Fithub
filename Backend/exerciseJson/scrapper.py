from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import json
import os

# List of all target body parts
muscle_groups = [
    "abdominals", "biceps", "calves", "chest", "forearms", "front-shoulders",
    "glutes", "hamstrings", "hands", "lats", "lowerback", "obliques",
    "quads", "rear-shoulders", "traps", "traps-middle", "triceps"
]

# Setup headless driver
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=options)
base_url = "https://musclewiki.com"

all_exercises = {}

for muscle in muscle_groups:
    print(f"Scraping: {muscle}")
    exercises_data = []

    main_url = f"{base_url}/exercises/male/{muscle}"
    driver.get(main_url)
    time.sleep(5)

    exercise_links = []
    try:
        container = driver.find_element(By.CSS_SELECTOR, "div.lg\\:col-span-7.col-span-10")
        anchor_tags = container.find_elements(By.TAG_NAME, "a")
        for a in anchor_tags:
            try:
                name_elem = a.find_element(By.TAG_NAME, "h2")
                title = name_elem.text.strip()
                href = a.get_attribute("href")
                if href and title:
                    exercise_links.append({"name": title, "url": href})
            except:
                continue
    except Exception as e:
        print(f"❌ Failed to get exercises for {muscle}: {e}")
        continue

    for ex in exercise_links:
        driver.get(ex["url"])
        time.sleep(3)

        videos = []
        try:
            video_elements = driver.find_elements(By.TAG_NAME, 'video')
            for video in video_elements:
                sources = video.find_elements(By.TAG_NAME, 'source')
                for source in sources:
                    src = source.get_attribute('src')
                    if src:
                        videos.append(src)
        except:
            pass

        instructions = []
        try:
            info_divs = driver.find_elements(By.CSS_SELECTOR, "div.border-gray-200.flex.items-center")
            for div in info_divs:
                dd = div.find_elements(By.TAG_NAME, "dd")
                for d in dd:
                    text = d.text.strip()
                    if text:
                        instructions.append(text)
        except:
            pass

        exercises_data.append({
            "exercise": ex["name"],
            "url": ex["url"],
            "videos": videos,
            "instructions": instructions
        })

    all_exercises[muscle] = exercises_data

driver.quit()

# Save to JSON
json_path = os.path.join(os.path.dirname(__file__), 'all_exercises.json')
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(all_exercises, f, indent=2)

# Log update
log_path = os.path.join(os.path.dirname(__file__), 'scrape_log.txt')
with open(log_path, "a") as log_file:
    log_file.write(f"Scrape completed at {time.ctime()}\n")

print("✅ All exercise data saved and logged.")
