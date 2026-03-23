<template>
    <div>
        <a-card class="no-padding-card" style="margin-top: 32px;border-radius: 12px;padding: 0;">
            <a-tabs v-model="activeKey" type="card" :animated="false" class="custom-tabs">
                <!-- TAB 1 -->
                <a-tab-pane key="req">
                    <span slot="tab" :class="['tab-label', activeKey === 'req' && 'tab-label--active-like']">
                        <a-icon type="idcard" />
                        <span>依頼・届出</span>
                    </span>

                    <div class="grid-feature">
                        <feature-card icon="solution" title="健保関連手続き" :items="[
                            '扶養追加',
                            '高齢者健保資格喪失届受付',
                            '第3号',
                            '保険証、氏名変更（再発行）',
                            '作業終了了文',
                            '介護保険適用対象外・再提出'
                        ]" />
                        <feature-card icon="file-done" title="離職票発行確認書" :items="[
                            '[HRBP提出]',
                            '離職票発行確認書',
                            '同意書',
                            '[従業員起票]',
                            '離職票',
                            '離職票発行',
                            '同意書'
                        ]" />
                        <feature-card icon="schedule" title="育児給付金延長申請" :items="['保育料不足延長申請']" class="feature-small" />
                    </div>
                </a-tab-pane>

                <!-- TAB 2 -->
                <a-tab-pane key="notice">
                    <span slot="tab" :class="['tab-label', activeKey === 'notice' && 'tab-label--active-like']">
                        <a-icon type="appstore" />
                        <span>案内・通知</span>
                    </span>

                    <div style="padding: 4px 24px 24px;">Content 案内・通知…</div>
                </a-tab-pane>
            </a-tabs>
        </a-card>

        <a-card style="margin-top: 32px;border-radius: 12px;">
            <h2 style="font-weight: 700;margin-bottom: 24px;">その他</h2>
            <div class="others-grid">
                <action-tile icon="phone" bgColor="#2f6fcb" title="問合せ" desc="新しい問合せを登録する" />
                <action-tile icon="question-circle" bgColor="#287f77" title="問合せ・FAQ" desc="会社全体の問い合わせに関して" />
                <action-tile icon="inbox" bgColor="#2f6fcb" title="問合せ・結果確認" desc="登録した問合せの回答を確認する" />
                <action-tile icon="folder" bgColor="#2f6fcb" title="ファイル共有" desc="ファイルを共有する" />
            </div>
        </a-card>


        <a-back-top :visibilityHeight="200" class="jp-back-top">
            <div class="jp-back-top__btn">
                <svg viewBox="0 0 24 24" class="jp-back-top__icon" aria-hidden="true" focusable="false">
                    <rect x="5" y="6" width="14" height="2" rx="1" ry="1" fill="#ffffff" />
                    <rect x="11" y="6" width="2" height="10" rx="1" ry="1" fill="#ffffff" />
                    <path d="M8.5 11.5 L12 8 L15.5 11.5" fill="none" stroke="#ffffff" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div class="jp-back-top__label">トップに戻る</div>
        </a-back-top>

    </div>
</template>

<script>
import FeatureCard from '@/components/common/FeatureCard.vue';
import ActionTile from '@/components/common/ActionTile.vue';

export default {
    name: 'RequestsView',
    components: { FeatureCard, ActionTile },
    data() {
        return {
            activeKey: 'req',
        };
    },
};
</script>

<style scoped>
.no-padding-card /deep/ .ant-card-body {
    padding: 18px 0 0 !important;
}

.grid-feature {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
    padding: 4px 24px 24px;
}

.feature-small {
    grid-column: 1 / 2;
    border-width: 2px;
}

.others-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.custom-tabs /deep/ .ant-tabs-nav {
    display: flex;
    width: 100% !important;
}

.custom-tabs /deep/ .ant-tabs-nav div {
    display: flex;
    width: 100% !important;
    border-top-left-radius: 12px !important;
    border-top-right-radius: 12px !important;
    padding-bottom: 8px !important;
}

.custom-tabs /deep/ .ant-tabs-bar {
    padding: 0 !important;
}

.custom-tabs /deep/ .ant-tabs-tab {
    flex: 0 0 50%;
    max-width: 50%;
    margin: 0 !important;
    text-align: center;
}

.custom-tabs /deep/ .ant-tabs-card-bar .ant-tabs-tab {
    position: relative;
    border-radius: 0;
    background: transparent;
    border: 0 !important;
    color: #8a95a6;
    border-bottom: 2px solid transparent !important;
    transition: color .15s ease, border-color .15s ease;
    font-size: 18px;
}

.custom-tabs /deep/ .ant-tabs-card-bar .ant-tabs-tab-active {
    color: #2f6fcb;
    font-weight: 700;
    background: #fff;
    border-bottom: 2px solid #2f6fcb !important;
}

.tab-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    color: #8a95a6;
    font-weight: 600;
}

.tab-label .anticon {
    color: #8a95a6;
    background: #f2f4f7;
    border-radius: 4px;
    padding: 4px;
    font-size: 20px;
    line-height: 1;
}

.tab-label--active-like {
    color: #2f6fcb;

}

.tab-label--active-like .anticon {
    color: #2f6fcb;
    background: #e6f0ff;
    font-size: 20px;
}

.custom-tabs /deep/ .ant-tabs-card-bar .ant-tabs-tab:not(.ant-tabs-tab-active):hover {
    color: #76839a;
}

.jp-back-top {
    z-index: 10;
    font-weight: 600;
    margin-bottom: 70px;
}

.jp-back-top /deep/ .jp-back-top__btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #b3b9e8;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: transform .15s ease, box-shadow .15s ease, background-color .2s ease;
}

.jp-back-top /deep/ .jp-back-top__btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
    background: #aab0e0;
}

.jp-back-top /deep/ .jp-back-top__icon {
    width: 32px;
    height: 32px;
    display: block;
}

.jp-back-top /deep/ .jp-back-top__label {
    margin-top: 8px;
    font-size: 12px;
    color: #000;
    white-space: nowrap;
}

@media (max-width: 992px) {
    .grid-feature {
        grid-template-columns: 1fr;
    }

    .feature-small {
        grid-column: auto;
    }

    .others-grid {
        grid-template-columns: 1fr;
    }
}
</style>