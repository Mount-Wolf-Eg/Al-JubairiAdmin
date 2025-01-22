<template>
  <main>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Roles
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Create Role
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <RolesTable></RolesTable>
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <RolesMthods></RolesMthods>
      </div>
    </div>
  </main>
</template>

<script setup>
import RolesMthods from "./RolesMthods.vue";
import RolesTable from "./RolesTable.vue";
</script>

<style lang="scss" scoped>
.nav-tabs {
  margin-bottom: 3rem;
  .nav-item {
    .nav-link {
      width: 15rem;
      font-size: 1.6rem;
      font-weight: bold;
      color: #686868 !important;
      &.active {
        color: #000 !important  ;
      }
    }
  }
}
</style>
