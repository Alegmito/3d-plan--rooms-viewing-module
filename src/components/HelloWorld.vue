<template>
  <div>
    <div class="viewer">
    <vc-viewer  @ready="ready" :fullscreenButton="true" :infoBox="true" :geocoder="true"
      :logo="false">
      <vc-navigation></vc-navigation>
      <vc-layer-imagery :alpha="alpha" :brightness="brightness" :contrast="contrast">
        <vc-provider-imagery-openstreetmap :url="url"></vc-provider-imagery-openstreetmap>
      </vc-layer-imagery>
      <vc-entity ref="entity" :position="position3" :id="id3" :billboard.sync="billboard3">
        <vc-graphics-billboard
          :image="image3"
          :scale="0.5"
          :show="show3"
          :distanceDisplayCondition="distanceDisplayCondition3"
          :verticalOrigin="verticalOrigin3"/>
      </vc-entity>
      <vc-entity 
        :polyline.sync="polyline1" 
        :name="name1">
        <vc-graphics-polyline
          :positions="positions1"
          :material="material1"
          :width="5"
          :clampToGround="false"
          :distanceDisplayCondition = "distanceDisplayCondition1"
        />
      </vc-entity>
      <!-- <vc-primitive-ground :appearance="appearance" :asynchronous="asynchronous" :interleave="interleave">
        <vc-instance-geometry :geometry="geometry">
          <vc-geometry-rectangle 
          :rectangle="rectangle"
          :stRotation="rotation"></vc-geometry-rectangle>
        </vc-instance-geometry>
      </vc-primitive-ground> -->
      <!-- <vc-collection-primitive-billboard>
        <vc-primitive-billboard
          :image="image2"
          :scale="0.4"
          :show="show"
          :distanceDisplayCondition="distanceDisplayCondition"
          :horizontalOrigin="horizontalOrigin"
          :position="position"
        ></vc-primitive-billboard>
      </vc-collection-primitive-billboard> -->
      
    </vc-viewer>

    <div class="demo-tool">
      <span>alpha</span>
      <vue-slider v-model="alpha" :min="0" :max="1" :interval="0.01"></vue-slider>
      <span>brightness</span>
      <vue-slider v-model="brightness" :min="0" :max="3" :interval="0.01"></vue-slider>
      <span>contrast</span>
      <vue-slider v-model="contrast" :min="0" :max="3" :interval="0.01"></vue-slider>
      <span>switch url</span>
      <b-form-select v-model="url" :options="options" placeholder="switch url">
      </b-form-select>
    </div>
  </div>
  </div>
  
</template>

<script>
  // import OpenStreetMapImageryProvider from 'vue-cesium/src/components/imageryLayer/openStreetMap/OpenStreetMapImageryProvider';
  import planImg from '../assets/plan-gam.png'
  import planImg1 from '../assets/plan-gam1.png'
  import planLabel from '../assets/geometka.png'
  // import Label from './Label'
  export default {
    // components: {
    //   Label
    //   },
    data() {
      return {
        url: 'https://a.tile.openstreetmap.org',
        options: [
          {
            value: 'https://a.tile.openstreetmap.org',
            text: 'openstreetmap1'
          },
          {
            value: 'https://stamen-tiles.a.ssl.fastly.net/toner/',
            text: 'openstreetmap2'
          }
        ],
        alpha: 1,
        brightness: 1,
        contrast: 1,
        appearance: null,
        geometry: null,
        image: planImg,
        rectangle: { west: 33.09607, south: 68.94811 , east: 33.09640, north: 68.94828},
        // rectangle: { west: 106.5, south: 29.5, east: 106.55, north: 33.5},
        interleave: true,
        asynchronous: false,
        rotation: Math.PI/4,

        // image2: planLabel,
        // position: { lng: 33.09628, lat: 68.94818, height: 0 },
        // billboard: {},
        // show: true,
        // distanceDisplayCondition: { near: 200, far: 20000000 },
        // horizontalOrigin: 0,

        // polyline properties
        name1: 'Маршрут проведения учета',
        polyline1: {},
        positions1: [],
        material1: undefined,
        distanceDisplayCondition1: {near: 30, far: 99},

        position3: { lng: 33.09628, lat: 68.94820, height: 0 },
        billboard3: {},
        show3: true,
        distanceDisplayCondition3: { near: 100, far: 20000000 },
        image3: planLabel,
        verticalOrigin3: 1,
        id3: 'СЦ АО "Гринатом"2'

      }  
    },
     mounted() {
      this.$refs.entity.createPromise.then(({viewer, cesiumObject }) => {
        viewer.zoomTo(cesiumObject)
      })
    },
    methods: {
      ready(cesiumInstance) {
        const { Cesium, viewer } = cesiumInstance
        this.appearance = new Cesium.MaterialAppearance({
            material: new Cesium.Material({
                fabric: {
                    type: 'Image',
                    uniforms: {
                        image: this.image
                    }
                }
            })
        });

        // Cesium.Transforms.headingPitchRollToFixedFrame()

        // let rotation = Cesium.Math.toRadians(30);

        // plan image tgrough viewer
        // function getRotationValue() {
        // rotation += 0.005;
        // return rotation;
        // }

        // function createModelRot (entity, heading, pitch, roll) {
        //   const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
        //   entity.orientation = Cesium.Transforms.headingPitchRollQuaternion(entity.position, hpr);
        // }

        this.material1 = new Cesium.PolylineDashMaterialProperty({
          color: Cesium.Color.BLUE,
          dashLength: 7
          });
        this.positions1 = [
            {lng: 33.096405, lat: 68.94813, height: 1},
            {lng: 33.09634, lat: 68.94816, height: 1},
            {lng: 33.09630, lat: 68.94815, height: 1},
            {lng: 33.096219, lat: 68.94819, height: 1},
            {lng: 33.09612, lat: 68.94817, height: 1},
            {lng: 33.09619, lat: 68.94813, height: 1},        
            {lng: 33.09627, lat: 68.94815, height: 1},  
            {lng: 33.09630, lat: 68.94814, height: 1},    
            {lng: 33.09634, lat: 68.94815, height: 1}, 
            {lng: 33.09639, lat: 68.94812, height: 1}, 
          ];

        let positionPlane = Cesium.Cartesian3.fromDegrees(33.09625, 68.94820, 0);
        // const hprZero = new Cesium.HeadingPitchRoll();
        var hpr_h = new Cesium.HeadingPitchRoll(0.95, 0, 0.001);
        // const orientationZero = Cesium.Transforms.headingPitchRollQuaternion(positionPlane, hprZero);
        var orientation_h = Cesium.Transforms.headingPitchRollQuaternion(positionPlane, hpr_h);
        Cesium.Transforms.eastNorthUpToFixedFrame;
        Cesium.Transforms.headingPitchRollToFixedFrame(positionPlane, hpr_h, Cesium.Ellipsoid.WGS84);
        console.log(orientation_h)

        const planeWidth = 16;
        viewer.entities.add({
          name: "Yellow plane outline",
          position: positionPlane,
          plane: {
            plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
            dimensions: new Cesium.Cartesian2(planeWidth*33.55/26.62, planeWidth),
            material: planImg1,
            outline: true,
            outlineColor: Cesium.Color.YELLOW,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(-15, 100.0)
          },
          orientation: orientation_h
        });

        positionPlane = Cesium.Cartesian3.fromDegrees(-90.0, 40.0, 300000.0);
        Cesium.Transforms.headingPitchRollToFixedFrame(positionPlane, hpr_h, Cesium.Ellipsoid.WGS84);
        orientation_h = Cesium.Transforms.headingPitchRollQuaternion(positionPlane, hpr_h);

        viewer.entities.add({
          name: "Yellow plane outline",
          position: positionPlane,
          plane: {
            plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
            dimensions: new Cesium.Cartesian2(400000.0, 300000.0),
            material: planImg1,
            outline: true,
            outlineColor: Cesium.Color.YELLOW
          },
          orientation: orientation_h
        });


        // viewer.entities.add({
        //     name: "Red translucent rectangle",
        //     rectangle: {
        //       // rotation: new Cesium.CallbackProperty(getRotationValue, false),
        //       // stRotation: new Cesium.CallbackProperty(getRotationValue, false),
        //       // rotation: rotation,
        //       // stRotation: rotation,
        //       coordinates: Cesium.Rectangle.fromDegrees(
        //        33.09594, 68.94794 , 33.09649, 68.94849
        //       ),
        //       material: planImg1
        //      }
        // });

        

        // createModelRot(planePlan, 0.3, 0.0, 0.0);

        // marker through viewer

        // viewer.entities.add({
        //   position : Cesium.Cartesian3.fromDegrees(68.94822, 33.09621),
        //   id: 'СЦ АО "Гринатом"',
        //   billboard : {
        //     image : planLabel,
        //     width : 64,
        //     height : 128,
        //   }
        // })



        // custom geocoder (doesn't work)
            
        // function OpenStreetMapNominatimGeocoder() {}

        // OpenStreetMapNominatimGeocoder.prototype.geocode = function (input) {
        //   var endpoint = "https://nominatim.openstreetmap.org/search";
        //   var resource = new Cesium.Resource({
        //     url: endpoint,
        //     queryParameters: {
        //       format: "json",
        //       q: input,
        //     },
        //   });

        //   return resource.fetchJson().then(function (results) {
        //     var bboxDegrees;
        //     return results.map(function (resultObject) {
        //       bboxDegrees = resultObject.boundingbox;
        //       return {
        //         displayName: resultObject.display_name,
        //         destination: Cesium.Rectangle.fromDegrees(
        //           bboxDegrees[2],
        //           bboxDegrees[0],
        //           bboxDegrees[3],
        //           bboxDegrees[1]
        //         ),
        //       };
        //     });
        //   });
        // };

        // viewer = new Cesium.Viewer();
        // console.log(viewer);
        
      }
      
    //   dbclicked() {
    //     const {viewer} = this.cesiumInstance
    //     viewer.zoomTo(viewer.entities, 0)
    //   }
    }
  }
  
</script>

