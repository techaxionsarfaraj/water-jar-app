<!-- <template>
  <v-app>
    <v-navigation-drawer app>
      <v-list density="compact" nav>
        <v-list-item to="/dashboard" title="Dashboard" prepend-icon="mdi-view-dashboard" exact />
        <v-list-item to="/customers" title="Customers" prepend-icon="mdi-account-group" exact />
        <v-list-item to="/stock" title="Stock" prepend-icon="mdi-view-list" exact />
        <v-list-item to="/order" title="Order" prepend-icon="mdi-cart" exact />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view /><!-- ✅ This displays Customers or Jar Stock ->
    </v-main>
  </v-app>
</template> -->
<!-- <template>
  <v-card>
    <v-layout>
      <v-navigation-drawer expand-on-hover permanent rail>
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmailcom"
            title="Sandra Adams"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item to="/dashboard" title="Dashboard" prepend-icon="mdi-view-dashboard" exact />
          <v-list-item to="/customers" title="Customers" prepend-icon="mdi-account-group" exact />
          <v-list-item to="/stock" title="Stock" prepend-icon="mdi-view-list" exact />
          <v-list-item to="/order" title="Order" prepend-icon="mdi-cart" exact />
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
        
      </v-main>
    </v-layout>
  </v-card>
</template> -->


<!-- src/App.vue -->
<template>
  <router-view />
</template>
