<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap' }
      ]
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

/* Rules for sizing the icon. */
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-3dots { font-size: 0.875rem; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-30 { font-size: 30px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

/* Rules for using icons as black on a light background. */
.material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
.material-icons.md-uicolor { color: rgb(85, 85, 85) }
.material-icons.md-icon-inactive { color: rgb(129, 129, 129) }
.material-icons.md-star { color: rgb(201, 183, 21) }
.material-icons.md-warning { color: rgb(216, 198, 34) }
.material-icons.md-imageUploaded { color: rgb(32, 131, 37) }
.material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

/* Rules for using icons as white on a dark background. */
.material-icons.md-light { color: rgba(255, 255, 255, 1); }
.material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }

a {
  -webkit-tap-highlight-color: transparent;
}
label {
  -webkit-tap-highlight-color: transparent;
}
button {
  -webkit-tap-highlight-color: transparent;
}

textarea::-webkit-input-placeholder {
  color: #808080;
}

textarea:-moz-placeholder { /* Firefox 18- */
  color: #808080; 
}

textarea::-moz-placeholder {  /* Firefox 19+ */
  color: #808080; 
}

textarea:-ms-input-placeholder {
  color: #808080; 
}

textarea::placeholder {
  color: #808080;
}
input[type="text"]::-webkit-input-placeholder {
  color: #808080;
}

input[type="text"]:-moz-placeholder { /* Firefox 18- */
  color: #808080; 
}

input[type="text"]::-moz-placeholder {  /* Firefox 19+ */
  color: #808080; 
}

input[type="text"]:-ms-input-placeholder {
  color: #808080; 
}

input[type="text"]::placeholder {
  color: #808080;
}
input[type="password"]::-webkit-input-placeholder {
  color: #808080;
}

input[type="password"]:-moz-placeholder { /* Firefox 18- */
  color: #808080; 
}

input[type="password"]::-moz-placeholder {  /* Firefox 19+ */
  color: #808080; 
}

input[type="password"]:-ms-input-placeholder {
  color: #808080; 
}

input[type="password"]::placeholder {
  color: #808080;
}
input[type="email"]::-webkit-input-placeholder {
  color: #808080;
}

input[type="email"]:-moz-placeholder { /* Firefox 18- */
  color: #808080; 
}

input[type="email"]::-moz-placeholder {  /* Firefox 19+ */
  color: #808080; 
}

input[type="email"]:-ms-input-placeholder {
  color: #808080; 
}

input[type="email"]::placeholder {
  color: #808080;
}
textarea,
input:matches(
  [type="email"],
  [type="number"],
  [type="password"],
  [type="search"],
  [type="tel"],
  [type="text"],
  [type="url"],
  [type="time"]
) {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  transition: 200ms;
}
</style>
