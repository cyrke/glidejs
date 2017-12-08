import { EventBus } from '../core/event/index'

export default function (Glide, Components) {
  let Events = new EventBus()

  const CONTROLS_SELECTOR = '[data-glide-el="controls"]'

  return {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    init () {
      this._els = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR)

      for (let i = 0; i < this._els.length; i++) {
        this.bind(this._els[i])
      }
    },

    /**
     * Binds events to arrows HTML elements.
     *
     * @return {Void}
     */
    bind (wrapper) {
      let children = wrapper.children

      for (var i = 0; i < children.length; i++) {
        Events.on(['click', 'touchstart'], children[i], this.click)
        Events.on(['mouseenter', 'mouseleave'], children[i], this.hover)
      }
    },

    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @return {Void}
     */
    unbind (wrapper) {
      let children = wrapper.children

      for (var i = 0; i < children.length; i++) {
        Events.off(['click', 'touchstart', 'mouseenter', 'mouseleave'], children[i])
      }
    },

    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in driection precised in
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {Void}
     */
    click (event) {
      event.preventDefault()

      if (!Glide.disabled) {
        Components.Run.stop().make(event.target.dataset.glideDir)

        Components.Animation.after(() => {
          Components.Run.init()
        })
      }
    },

    /**
     * Handles `hover` event on the arrows HTML elements.
     * Plays and pauses autoplay running.
     *
     * @param {Object} event
     * @return {Void}
     */
    hover (event) {
      if (!Glide.disabled) {
        if (event.type === 'mouseleave') {
          Components.Run.init()
        }

        if (event.type === 'mouseenter') {
          Components.Run.stop()
        }
      }
    }
  }
}
