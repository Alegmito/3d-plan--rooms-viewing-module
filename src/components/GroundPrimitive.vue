<template>
      <vc-primitive-ground :appearance="appearance" :asynchronous="asynchronous" :interleave="interleave">
        <vc-instance-geometry :geometry="geometry">
          <vc-geometry-rectangle :rectangle="rectangle"></vc-geometry-rectangle>
        </vc-instance-geometry>
      </vc-primitive-ground>
</template>

<script>
export default {
    data() {
        return {
            appearance: null,
            geometry: null,
            image: '../assets/plan-gam.svg',
            rectangle: { west: 102.5, south: 29.5, east: 106.5, north: 33.5},
            interleave: true,
            asynchronous: false
        }
    },
    props: {
        ready : 
    }
    methods: {
        ready(cesiumInstance) {
            this.appearance = new Cesium.MaterialAppearance({
                material: new Cesium.Material({
                    fabric: {
                        type: 'Image',
                        uniforms: {
                            image: this.image
                        }
                    }
                })
            })
        }
    }
}
</script>