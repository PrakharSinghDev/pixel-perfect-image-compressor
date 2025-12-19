<div align="center">
  <a href="https://github.com/yourusername/pixel-perfect-compressor">
    <img src="./public/PixelPerfect-ImgCompressor.png" alt="PixelPerfect Logo" width="400">
  </a>

  <h3 align="center">PixelPerfect Image Compressor</h3>

  <p align="center">
    Privacy-focused image compression designed for simplicity.
    <br />
    <a href="#-running-locally"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://localhost:3000">View Demo</a>
    ·
    <a href="https://github.com/yourusername/pixel-perfect-compressor/issues">Report Bug</a>
    ·
    <a href="https://github.com/yourusername/pixel-perfect-compressor/issues">Request Feature</a>
  </p>
</div>

---

## About The Project

**PixelPerfect** was born out of a need for a simple way to compress images without compromising privacy by uploading them to unnecessary third-party servers.

This tool performs **100% client-side processing**. It leverages the native HTML5 Canvas API directly within your browser to handle image resizing and compression. This means your files never leave your device, ensuring complete privacy and lightning-fast results without network latency. It features a clean, dark-mode interface with real-time feedback, putting you in complete control of the file-size vs. quality balance.

### Key Features

* **Privacy First:** All processing happens locally in your browser. **No server uploads ever.**
* **Real-Time Estimates:** Instantly see predicted file sizes as you adjust the quality slider.
* **Simple UI:** A clean, modern dark mode interface free from clutter and ads.
* **Precise Control:** Fine-tune your images with an adjustable compression level ranging from 1% to 100%.

---

## Tech Stack

This project is built using modern web technologies focused on performance and developer experience.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) | App Router for structure and routing. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI development. |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautiful, consistent icons. |
| **Core** | HTML5 Canvas API | Native browser API used for image manipulation. |

---

## Getting Started

Follow these steps to get a local copy up and running on your machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn

### Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/pixel-perfect-compressor.git](https://github.com/yourusername/pixel-perfect-compressor.git)
    cd pixel-perfect-compressor
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or if using yarn:
    # yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    # or if using yarn:
    # yarn dev
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:3000` to see the application.

---

## Deployment

The project is optimized for easy deployment on platforms supporting Next.js, such as Vercel.

1.  Push your code to a GitHub repository.
2.  Log in to Vercel and import the project.
3.  Click **Deploy**.

> **Note:** As this is a client-side only application, no environment variables or complex backend configuration are required.

---