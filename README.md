# Google Maps Demo App

An interactive demo showcasing the integration of Google Maps using the JavaScript API. This project loads a map into a webpage and demonstrates basic interaction features like map centering and marker placement.

## 🌍 Project Overview

This project is a static web demo built with **HTML, CSS, and JavaScript**, and it uses the **Google Maps JavaScript API** to display a map on a web page.

## 📁 Folder Structure

```text
google-maps-demo-app/
├── index.html
├── css/
│ └── styles.css
├── js/
│ └── app.js
├── README.md
```


> Adjust the folder list if your structure differs slightly.

---

## ⚙️ Prerequisites

- A web browser (Chrome, Firefox, Edge, etc.)
- A valid [Google Maps JavaScript API Key](https://console.cloud.google.com/)
- (Optional) Python 3 to serve the site locally

---

## 🚀 Setup & Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/techguru0203-wq/google-maps-demo-app.git
```

```bash
cd google-maps-demo-app
```

### 2. Insert Your Google Maps API Key

Edit the index.html file and replace the placeholder with your actual API key:
``` bash
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap" async defer></script>
```

### 3. Serve Locally (Recommended)
# Using Python 3
```bash
python -m http.server 8000
```

# Then open in your browser:
http://localhost:8000


## 🧭 Usage

On page load, the Google Map appears centered on a default location.

You can customize:

Center coordinates

Zoom level

Marker positions

Info windows (if implemented)

All logic can be found in ```js/app.js.```