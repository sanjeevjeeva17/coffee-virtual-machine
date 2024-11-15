import 'jest-preset-angular/setup-jest';

if (!Element.prototype.animate) {
  Element.prototype.animate = function (
    keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
  ): Animation {
    return {
      play: () => {},
      pause: () => {},
      finish: () => {},
      cancel: () => {},
      reverse: () => {},
      currentTime: 0,
      playbackRate: 1,
      addEventListener: () => {},
      removeEventListener: () => {},
      onfinish: null,
      oncancel: null,
      effect: null,
      finished: Promise.resolve(this),
      playState: 'idle',
      updatePlaybackRate: () => {},
      timeline: null,
    } as unknown as Animation;
  };
}
