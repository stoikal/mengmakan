/* eslint-disable no-param-reassign */
export const itActsAsToggleFavoriteElement = (element) => {
  it('should have "liked" attribute if property liked is set to true', () => {
    element.liked = true;

    expect(element.hasAttribute('liked')).toBe(true);
  });

  it('should not have "liked" attribute if property liked is set to false', () => {
    element.liked = false;

    expect(element.hasAttribute('liked')).toBe(false);
  });

  it('should invoke "like" event if its button is clicked when it does not have "liked" attribute', () => {
    const onLikeCb = jasmine.createSpy('onLikeCb');
    element.liked = false;
    element.addEventListener('like', onLikeCb);

    element.button.click();

    expect(onLikeCb).toHaveBeenCalledTimes(1);
  });

  it('should invoke "unlike" event if its button is clicked when it has "liked" attribute', () => {
    const onUnLikeCb = jasmine.createSpy('onUnLikeCb');
    element.setAttribute('liked', '');
    element.addEventListener('unlike', onUnLikeCb);

    element.button.click();

    expect(onUnLikeCb).toHaveBeenCalled();
  });

  it('should not invoke "like" event if its button is clicked when it has "liked" attribute', () => {
    const onUnLikeCb = jasmine.createSpy('onUnLikeCb');
    element.liked = true;
    element.addEventListener('like', onUnLikeCb);

    element.button.click();

    expect(onUnLikeCb).not.toHaveBeenCalled();
  });

  it('should not invoke "unlike" event if its button is clicked when it does not have "liked" attribute', () => {
    const onLikeCb = jasmine.createSpy('onLikeCb');
    element.liked = false;
    element.addEventListener('unlike', onLikeCb);

    element.button.click();

    expect(onLikeCb).not.toHaveBeenCalled();
  });
};

export default {
  itActsAsToggleFavoriteElement,
};
