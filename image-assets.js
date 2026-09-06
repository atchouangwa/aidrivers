(() => {
  const setImage = (alt, src) => {
    const img = document.querySelector(`img[alt="${alt}"]`);
    if (!img) return;
    img.src = src;
    img.removeAttribute('srcset');
  };

  setImage('AI Drivers', '/aidrivers-mark.svg');
  setImage('Alo, @RunMoreWebinars', '/alo.jpg');
  setImage('Kabrin Johal', '/kabrin.jpg');
  setImage('Elijah Bricker', '/elijah.jpg');
})();
