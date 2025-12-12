# PixelPerfect Image Compressor

I built this tool because I wanted a **simple way to compress images** without uploading them to a third-party server. It focuses on **privacy and simplicity**. Everything runs locally in your browser using the HTML5 Canvas API. Your files never leave your device.

---

## Features

* **Privacy First:** 100% client-side processing. **No server uploads.**
* **Real-Time Estimates:** Shows the predicted file size as you adjust the quality slider.
* **Simple UI:** Clean dark mode interface without unnecessary clutter.
* **Control:** Adjustable compression level (1% - 100%).

## Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Core** | Native HTML5 Canvas API |

---

## Running Locally

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/PrakharSinghDev/pixel-perfect-image-compressor.git
    cd pixel-perfect-compressor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Go to `http://localhost:3000`

---

## Deployment

Deploy easily with Vercel:

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  Deploy.

> **Note:** No environment variables or backend configuration needed.
