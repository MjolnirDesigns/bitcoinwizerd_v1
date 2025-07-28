"use client";

import { useEffect, useRef } from "react";
import styles from "@/loader.module.css"; // Fixed path
import { cn } from "@/utils";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("2D context is not supported on this canvas.");
      return;
    }

    // Apply the CSS variable to the canvas style
    canvas.style.setProperty("--bitcoin-orange", "var(--bitcoin-orange, #F7931A)"); // Fallback color

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    class Symbol {
      terms = ["₿itcoin"]; // Keep as is, or change to ["Bitcoin"] if preferred
      characters =
        "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz?!@#$%^&*";
      x: number;
      y: number;
      fontSize: number;
      text: string;
      canvasHeight: number;
      speed: number;
      fade: number;
      isTerm: boolean;
      termChars: string[];

      constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
        this.speed = Math.random() * 0.1 + 0.95;
        this.fade = 0.1;
        this.isTerm = false;
        this.termChars = [];
      }

      draw(context: CanvasRenderingContext2D) {
        this.fade += 1;
        const brightness = Math.max(255 - this.fade * 10, 100);

        if (this.isTerm && this.termChars.length > 0) {
          this.text = this.termChars.shift()!;
          context.fillStyle = getComputedStyle(canvas!).getPropertyValue("--bitcoin-orange") || "#F7931A"; // Use computed style or fallback
        } else if (Math.random() < 0.001) {
          this.isTerm = true;
          this.termChars = this.terms[0].split("");
          this.text = this.termChars.shift()!;
          context.fillStyle = getComputedStyle(canvas!).getPropertyValue("--bitcoin-orange") || "#F7931A";
        } else {
          this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
          this.isTerm = false;
          context.fillStyle = `rgba(${brightness}, 255, ${brightness}, 1)`;
        }

        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.99) {
          this.y = 0;
          this.fade = 0;
          this.isTerm = false;
          this.termChars = [];
        } else {
          this.y += this.speed;
        }
      }
    }

    class Effect {
      canvasWidth: number;
      canvasHeight: number;
      fontSize: number;
      columns: number;
      symbols: Symbol[];

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = window.innerWidth < 640 ? 20 : 25;
        this.columns = Math.floor(this.canvasWidth / this.fontSize);
        this.symbols = [];
        this.#initialize();
      }

      #initialize() {
        for (let i = 0; i < this.columns; i++) {
          this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
      }

      resize(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.fontSize = width < 640 ? 20 : 25;
        this.columns = Math.floor(this.canvasWidth / this.fontSize);
        this.symbols = [];
        this.#initialize();
      }
    }

    const effect = new Effect(canvas.width, canvas.height);
    let lastTime = 0;
    const fps = 15;
    const nextFrame = 1000 / fps;
    let timer = 0;
    let animationFrameId: number;

    function animate(timeStamp: number) {
      if (!ctx || !canvas) return;
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      if (timer > nextFrame) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.textAlign = "center";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${effect.fontSize}px monospace`;
        effect.symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
      } else {
        timer += deltaTime;
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate(0);

    const handleResize = () => {
      updateCanvasSize();
      effect.resize(canvas.width, canvas.height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={cn(styles.canvas, "absolute top-0 left-0 w-full h-full z-0")} />;
}