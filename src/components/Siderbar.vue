<template>
  <div>
    <nav class="nav m-auto p-3">
          <div class="sidebar-sticky">
            <h6
              class="sidebar-heading
                d-flex
                justify-content-between
                align-items-center
                px-3 mt-4 mb-1
                text-muted"
              >
              <span>管理者</span>
              <a class="d-flex align-items-center text-muted" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul class="nav flex-column mb-2">
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/products">
                <i class="fas fa-box-open"></i>
                  產品列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/olderlist">
                  <i class="fas fa-list-ul"></i>
                  訂單列表
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/voucher">
                  <i class="far fa-sticky-note"></i>
                  優惠卷
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
  </div>
</template>
