(this.webpackJsonpclient = this.webpackJsonpclient || []).push([
  [3],
  {
    59: function (t, e, s) {
      t.exports = {
        ListItem: 'ServiceListItem_ListItem__2u65Q',
        ListButton: 'ServiceListItem_ListButton__3VGBq',
        'is-dark': 'ServiceListItem_is-dark__2qL_K',
      };
    },
    60: function (t, e, s) {
      'use strict';
      s.r(e);
      s(0);
      var i = s(19),
        c = s(59),
        a = s.n(c),
        n = s(4),
        o = s(1);
      e.default = function (t) {
        var e = Object(n.e)(function (t) {
          return t.darkMode;
        });
        return Object(o.jsxs)('li', {
          className: a.a.ListItem,
          children: [
            Object(o.jsx)(i.a, {
              classConfig: 'ListElipsedName',
              labelText: t.name,
            }),
            Object(o.jsx)(i.a, { classConfig: 'ListHour', labelText: t.hour }),
            Object(o.jsx)(i.a, {
              classConfig: 'ListElipsedLabel',
              labelText: t.service,
            }),
            Object(o.jsx)('button', {
              className: e
                ? ''.concat(a.a.ListButton, ' ').concat(a.a['is-dark'])
                : ''.concat(a.a.ListButton),
              children: 'Check',
            }),
          ],
        });
      };
    },
  },
]);
//# sourceMappingURL=3.d49b2004.chunk.js.map
