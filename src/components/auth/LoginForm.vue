<template>
    <div class="auth-page">
        <div class="auth-card">
            <div class="auth-header">
                <h1 class="auth-title">Đăng nhập</h1>
                <p class="auth-subtitle">Chào mừng trở lại! Vui lòng nhập thông tin để tiếp tục.</p>
            </div>

            <a-form-model ref="f" :model="form" :rules="rules" layout="vertical" @submit.native.prevent="onSubmit">
                <a-form-model-item label="Tài khoản" prop="userCode">
                    <a-input v-model="form.userCode" placeholder="Nhập tên đăng nhập" allow-clear>
                        <a-icon slot="prefix" type="user" />
                    </a-input>
                </a-form-model-item>

                <a-form-model-item label="Mật khẩu" prop="password">
                    <a-input-password v-model="form.password" placeholder="Nhập mật khẩu">
                        <a-icon slot="prefix" type="lock" />
                    </a-input-password>
                </a-form-model-item>

                <a-button type="primary" html-type="submit" :loading="loading" block class="auth-submit">
                    Đăng nhập
                </a-button>
            </a-form-model>
        </div>
    </div>
</template>

<script>
import { login } from '@/service/auth';

export default {
    name: 'LoginForm',
    data() {
        return {
            loading: false,
            form: { userCode: '', password: '' },
            rules: {
                userCode: [{ required: true, message: 'Nhập tài khoản' }],
                password: [{ required: true, message: 'Nhập mật khẩu' }],
            },
        };
    },
    methods: {
        onSubmit() {
            this.$refs.f.validate(async (valid) => {
                if (!valid) return;
                this.loading = true;
                try {
                    await login(this.form);
                    this.$message.success('Đăng nhập thành công');
                    this.$emit('success');
                } catch (e) {
                    this.$message.error(e.message || 'Đăng nhập thất bại');
                } finally {
                    this.loading = false;
                }
            });
        },
    },
};
</script>

<style scoped>
.auth-page {
    min-height: 100vh;
    background: #f6f7fb;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    box-sizing: border-box;
}

.auth-card {
    width: 380px;
    max-width: 92vw;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
    padding: 28px 28px 26px;
    animation: fadeIn 0.35s ease;
}

.auth-header {
    text-align: center;
    margin-bottom: 18px;
}

.auth-logo {
    width: 56px;
    height: 56px;
    margin-bottom: 8px;
}

.auth-title {
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: #1f2937;
}

.auth-subtitle {
    margin: 6px 0 0;
    font-size: 13px;
    color: #6b7280;
}

.auth-submit {
    height: 40px;
    border-radius: 8px;
    font-size: 15px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>