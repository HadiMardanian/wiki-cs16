import { ConsoleCodeBlock } from "@/components/ConsoleCodeBlock";

export default function VideoPage() {
  return (
    <div className="space-y-6">
      <h1 className="cs-pixel text-lg text-[var(--cs-menu-hot)]">Video</h1>
      <ConsoleCodeBlock
        title="Performance-first video"
        lines={[
          "fps_max 101",
          "gl_vsync 0",
          "gl_picmip 2",
          "cl_weather 0",
        ]}
      />
      <div className="text-sm text-[var(--cs-green)]/75">
        Placeholder page — add resolution notes, OpenGL quirks, and FPS consistency guidance.
      </div>
    </div>
  );
}

