import $ from 'jquery';

$.fn.animFx = function (timeout) {
  // Для одиночного элемента

  // if (!this.hasClass('active')) {
  //   this.addClass('active');
  // }

  // return $.extend(this, {
  //   __promise__: new Promise(resolve => {
  //     if (timeout !== undefined) {
  //       setTimeout(() => resolve(this[0]), timeout);
  //     } else {
  //       const event = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
  //       this.on(event, () => resolve(this.off(event)[0]));
  //     }
  //   }),
  // });

  const promises = this.map((index, element) => {
    const $element = $(element);

    if (!$element.hasClass('active')) {
      $element.addClass('active');
    }

    return new Promise(resolve => {
      if (timeout !== undefined) {
        setTimeout(() => resolve($element[0]), timeout);
      } else {
        const event = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
        $element.on(event, () => resolve($element.off(event)[0]));
      }
    });
  }).get();

  return $.extend(this, { 
    __promise__: Promise.all(promises),
  });
};

// $.fn.animFx = function (options) {
//   const type = $.type(options);

//   return this.each((index, element) => {
//     const $element = $(element);

//     if ($element.hasClass('active')) {
//       return;
//     }

//     if (type == 'function') {
//       const event = 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd';
//       $element.on(event, () => {
//         $element.off(event);
//         options.call($element[0]);
//       });
//     } else if (type == 'object') {
//       setTimeout(
//         () => options.complete && options.complete.call($element[0]), 
//         options.timeout
//       );
//     }

//     $element.addClass('active');
//   });
// };