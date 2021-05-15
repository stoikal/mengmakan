const clearChildren = (parentEl) => {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.lastChild);
  }
};

export default {
  clearChildren,
};
