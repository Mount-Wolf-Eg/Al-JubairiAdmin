<template>
  <main>
    <button class="get-location" @click="showMap = true" v-if="!showMap">
      Get Location
    </button>

    <div class="map" v-if="showMap">
      <div id="map" style="height: 400px; width: 100%"></div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { defineEmits } from "vue";
import L from "leaflet";

const showMap = ref(false);
const mapInstance = ref(null);
let marker = null;
const emits = defineEmits(["lat", "lng"]);

function initializeMap(lat, lng) {
  if (showMap.value) {
    mapInstance.value = L.map("map", {
      center: [lat, lng],
      zoom: 17,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(mapInstance.value);

    mapInstance.value.on("click", (e) => {
      const { lat, lng } = e.latlng;

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker([lat, lng]).addTo(mapInstance.value);
      }
      emits("lat", lat);
      emits("lng", lng);
    });
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
        initializeMap(51.505, -0.09);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
    initializeMap(51.505, -0.09);
  }
}

watch(showMap, (newValue) => {
  if (newValue) {
    nextTick(() => {
      getUserLocation();
    });
  }
});
</script>

<style lang="scss" scoped>
.get-location {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.get-location:hover {
  background-color: #0056b3;
}

.map {
  margin-top: 20px;
}
</style>
