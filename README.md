# Assets CDN

Centralized repository for static assets (images, icons, banners) to use across multiple projects.

## 📤 How to Upload Content

1. **Drag your images** to the corresponding folder (`backgrounds/`, `banners/`, `icons/`, `logos/`, or `products/`)

2. **Run Git commands**:
   ```bash
   git add .
   git commit -m "Add new images"
   git push
   ```

3. **Use the generated link**. Always follow this pattern:
   ```
   https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/[folder]/[filename]
   ```

### 🔍 Example with WhatsApp Icon:

If you upload `Whatsapp.svg` to the `images/logos/` folder, the link will be:

```
https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/logos/Whatsapp.svg
```

**Link breakdown:**
- `@master` → Branch name (will always be `master` in this repo)
- `images/logos/` → Path to the folder where the file is located
- `Whatsapp.svg` → Filename with extension

> **Note**: The CDN may take 1-2 minutes to update after pushing.

---

## 🚀 Usage

All assets are available via jsDelivr CDN:

```
https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/[file-path]
```

### Examples:

```html
<!-- Logo -->
<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/logos/logo.svg" alt="Logo">

<!-- Banner -->
<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/banners/hero-casino.jpg" alt="Banner">

<!-- Icono -->
<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/icons/check.svg" alt="Check">
```

### Con React/JSX:

```jsx
<img 
  src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/logos/logo.svg" 
  alt="Logo" 
/>
```

### Con CSS:

```css
.hero {
  background-image: url('https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/backgrounds/hero-bg.jpg');
}
```

## 📁 Estructura

```
assets-cdn/
├── images/
│   ├── logos/          # Logos de marcas y proyectos
│   ├── banners/        # Banners promocionales y hero images
│   ├── icons/          # Iconos SVG
│   ├── backgrounds/    # Fondos e imágenes decorativas
│   └── products/       # Imágenes de productos
├── fonts/              # Fuentes personalizadas
└── videos/             # Videos (usar con precaución, pueden ser pesados)
```

## ⚡ Advantages

- **Global CDN**: Fast servers worldwide
- **Free**: No bandwidth limits
- **Automatic caching**: Load optimization
- **Versioning**: Control with Git tags
- **No configuration**: Just upload and use

## 🔄 Versions

To use a specific version (recommended for production):

```html
<!-- Specific version with tag -->
<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@v1.0.0/images/logos/logo.svg">

<!-- Latest version from master (development) -->
<img src="https://cdn.jsdelivr.net/gh/BlueBullTech/BBassets@master/images/logos/logo.svg">
```

## 📝 Conventions

- **File names**: kebab-case (logo-dark.svg, hero-banner.jpg)
- **Recommended formats**:
  - Logos and icons: `.svg` (scalable)
  - Photos: `.jpg` or `.webp`
  - Images with transparency: `.png` or `.webp`
- **Optimize before uploading**: Use tinypng.com or similar

## 🚀 Projects Using This CDN

- BombaCalor Landing
- Casino Promos
- Terms and Conditions

---

**Last updated**: November 2025
