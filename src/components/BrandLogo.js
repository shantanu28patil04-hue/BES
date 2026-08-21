// Brand Logo Component for BES – Best Engineering Services using the uploaded brand asset
export function renderBrandLogo(options = {}) {
  const {
    variant = "full", // 'full' | 'compact' | 'white' | 'iconOnly'
    className = "",
    size = "md" // 'sm' | 'md' | 'lg' | 'xl'
  } = options;

  const heights = {
    sm: "h-10",
    md: "h-16",
    lg: "h-24",
    xl: "h-36"
  };

  const selectedHeight = heights[size] || "h-16";

  return `
    <div class="inline-flex items-center gap-3 select-none ${className}">
      <img 
        src="./src/assets/logo.jpg" 
        alt="BES – Best Engineering Services Logo" 
        class="${selectedHeight} w-auto object-contain rounded-lg bg-white p-0.5 shadow-sm"
        onerror="this.onerror=null; this.src='https://placehold.co/150x150/0f2c59/ffffff?text=BES+Logo';"
      />
    </div>
  `;
}
