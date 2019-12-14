<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <h6
              class="sidebar-heading
                d-flex
                justify-content-between
                align-items-center
                px-3 mt-4 mb-1
                text-muted"
              >
              <span>Shop</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/coustmer_olders">
                  <span data-feather="file-text"></span>
                  <i class="fas fa-store"></i>
                  模擬訂單
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
  </div>
</template>
