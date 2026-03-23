<template>
  <div class="app-header">
    <div class="left">LOGO</div>

    <div class="right">
      <div class="user-block">
        <div class="user-text">
          <div class="top">HROne</div>
          <div class="name">フィグマ 太郎</div>
        </div>

        <a-dropdown placement="bottomRight" :trigger="['hover']">
          <a-avatar :size="32" style="background: transparent; border: 1px solid #fff; color: #fff;">
            <a-icon type="user" />
          </a-avatar>

          <a-menu slot="overlay" @click="onMenuClick">
            <a-menu-item key="logout">
              Đăng xuất
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '@/service/auth';

export default {
  name: 'AppHeader',
  methods: {
    async onMenuClick({ key }) {
      if (key === 'logout') {
        try {
          this.$message.success('Đăng xuất thành công');
          await logout();
          this.$router.push('/login');
        } catch (e) {
          this.$message.error(e?.message || 'Đăng xuất thất bại');
        }
      }
    },
  },
};
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  color: #fff;
  padding: 0 64px;
  box-sizing: border-box;
}

.left {
  flex: 1;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.right {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
}

.user-block {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.15;
  gap: 4px;
}

.user-text .top {
  font-size: 12px;
  opacity: .9;
  white-space: nowrap;
}

.user-text .name {
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}
</style>