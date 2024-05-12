<template>
  <div class="bg-cyan text-white">
    <q-toolbar>
      <q-btn flat round dense icon="assignment_ind" />

      <q-space />

      <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
      <q-btn flat round dense icon="gamepad" />
    </q-toolbar>

    <q-toolbar inset>
      <q-breadcrumbs active-color="white" style="font-size: 16px">
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el label="Components" icon="widgets" />
        <q-breadcrumbs-el label="Toolbar" />
      </q-breadcrumbs>
    </q-toolbar>
  </div>
</template>

<script>
export default {
  name: 'HeaderPrincipal'
}
</script>
