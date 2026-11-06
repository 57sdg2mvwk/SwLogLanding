---
name: ShapeWaves WebGPU fallback
description: Replit's preview browser may not provide a WebGPU adapter for ShapeWaves.
---

Treat ShapeWaves as progressive enhancement and preserve an animated CSS/SVG fallback for browsers without a WebGPU adapter.

**Why:** The Replit preview browser returned `navigator.gpu.requestAdapter() returned null`, so the WebGPU effect did not render there.

**How to apply:** When using ShapeWaves or another `vgpu` effect, keep a lightweight fallback that retains the intended motion and verify the GPU path separately in a browser with WebGPU support.
