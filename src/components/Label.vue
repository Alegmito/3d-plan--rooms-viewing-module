<template>
      <vc-entity ref="entity" :position="position" :id="id" :billboard.sync="billboard">
        <vc-graphics-billboard
          :image="image"
          :scale="0.5"
          :show="show"
          :distanceDisplayCondition="distanceDisplayCondition"
          :horizontalOrigin="horizontalOrigin"/>
      </vc-entity>
</template>

<script>
import planLabel from '../assets/geometka.png'
export default {
    data() {
        return {
            position: { lng: 33.09628, lat: 68.94820, height: 0 },
            billboard: {},
            show: true,
            distanceDisplayCondition: { near: 200, far: 20000000 },
            image: planLabel,
            horizontalOrigin: 0,
            id: 'СЦ АО "Гринатом"'
            
        }
    }
}