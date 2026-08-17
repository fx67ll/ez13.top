<template>
	<div class="ez-home" :class="{ 'ez-home--config': configOpen }">
		<!-- 沉浸式主舞台：全屏时钟 -->
		<main class="ez-home-stage">
			<div class="ez-home-clock-area">
				<transition name="ez-home-fade" mode="out-in">
					<div v-if="settings.clockType === 'digital'" key="digital" class="ez-home-clock-item">
						<fx67ll-digital-clock :theme="settings.digital.theme" :timeZone="settings.digital.timeZone"
							:hour12="settings.digital.hour12" :showDigital="settings.digital.showDigital"
							:smoothSeconds="settings.digital.smoothSeconds" :showDate="settings.digital.showDate"
							:showAnalog="settings.digital.showAnalog"
							:zoomSize="settings.digital.zoom"></fx67ll-digital-clock>
					</div>
					<div v-else-if="settings.clockType === 'binary'" key="binary" class="ez-home-clock-item">
						<fx67ll-binary-clock :isShowTime="settings.binary.isShowTime"
							:showLabel="settings.binary.showLabel" :zoomSize="settings.binary.zoom"
							:dotSize="settings.binary.dotSize" :textSize="settings.binary.textSize"
							:textSpacing="settings.binary.textSpacing">
						</fx67ll-binary-clock>
					</div>
					<div v-else key="flip" class="ez-home-clock-item">
						<ez-flip-clock :mode="settings.flip.mode" :targetDate="settings.flip.targetDate"
							:showSeconds="settings.flip.showSeconds" :showLabels="settings.flip.showLabels"
							:zoomSize="settings.flip.zoom"></ez-flip-clock>
					</div>
				</transition>
			</div>
		</main>

		<!-- 快捷键提示：左下角小字，仅沉浸模式下显示 -->
		<p class="ez-home-hint" v-if="!configOpen" aria-hidden="true">Ctrl+E+Z 设置</p>

		<!-- 合规页脚 -->
		<fx67ll-footer fontColor="#9aa7b3"></fx67ll-footer>

		<!-- 悬浮设置面板：快捷键唤起，不挤占页面布局 -->
		<transition name="ez-home-pop">
			<section v-if="configOpen" class="ez-home-panel" aria-label="界面设置">
				<div class="ez-home-panel-head">
					<span class="ez-home-panel-title">界面设置</span>
					<button class="ez-home-panel-reset" type="button" @click="resetLocalSettings">恢复默认</button>
					<button class="ez-home-panel-close" type="button" aria-label="关闭设置"
						@click="configOpen = false">&times;</button>
				</div>

				<!-- 时钟类型 -->
				<div class="ez-home-settings-row">
					<span class="ez-home-settings-label">时钟类型</span>
					<div class="ez-home-segment">
						<button type="button" :class="{ active: settings.clockType === 'digital' }"
							@click="settings.clockType = 'digital'">数字</button>
						<button type="button" :class="{ active: settings.clockType === 'binary' }"
							@click="settings.clockType = 'binary'">二进制</button>
						<button type="button" :class="{ active: settings.clockType === 'flip' }"
							@click="settings.clockType = 'flip'">翻页</button>
					</div>
				</div>

				<!-- 数字时钟配置 -->
				<template v-if="settings.clockType === 'digital'">
					<div class="ez-home-settings-row ez-home-settings-row--stacked">
						<span class="ez-home-settings-label">时钟主题</span>
						<div class="ez-home-theme-list">
							<div v-for="(row, rowIndex) in digitalThemeRows" :key="rowIndex" class="ez-home-theme-row">
								<button v-for="item in row" :key="item.value" type="button" class="ez-home-theme-swatch"
									:class="{ active: settings.digital.theme === item.value }" :title="item.label"
									:aria-label="item.label" :aria-pressed="settings.digital.theme === item.value"
									@click="settings.digital.theme = item.value">
									<span class="ez-home-theme-dot" :style="{ background: item.color }"></span>
									<span class="ez-home-theme-name">{{ item.label }}</span>
								</button>
							</div>
						</div>
					</div>
					<div class="ez-home-settings-row">
						<label class="ez-home-settings-label" for="ez-digital-time-zone">显示时区</label>
						<select id="ez-digital-time-zone" class="ez-home-select" v-model="settings.digital.timeZone">
							<option v-for="item in timeZoneList" :key="item.value" :value="item.value">
								{{ item.label }}
							</option>
						</select>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">12 小时制</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.digital.hour12 ? 'true' : 'false'"
							@click="settings.digital.hour12 = !settings.digital.hour12">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示数字时间</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.digital.showDigital ? 'true' : 'false'"
							@click="settings.digital.showDigital = !settings.digital.showDigital">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">秒针平滑扫动</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.digital.smoothSeconds ? 'true' : 'false'"
							@click="settings.digital.smoothSeconds = !settings.digital.smoothSeconds">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示日期星期</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.digital.showDate ? 'true' : 'false'"
							@click="settings.digital.showDate = !settings.digital.showDate">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示模拟钟盘</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.digital.showAnalog ? 'true' : 'false'"
							@click="settings.digital.showAnalog = !settings.digital.showAnalog">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
				</template>

				<!-- 二进制时钟配置 -->
				<template v-if="settings.clockType === 'binary'">
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示十进制时间</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.binary.isShowTime ? 'true' : 'false'"
							@click="settings.binary.isShowTime = !settings.binary.isShowTime">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示单位标签</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.binary.showLabel ? 'true' : 'false'"
							@click="settings.binary.showLabel = !settings.binary.showLabel">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<label class="ez-home-settings-label" for="ez-binary-dot-size">圆点尺寸</label>
						<div class="ez-home-range-control">
							<input id="ez-binary-dot-size" class="ez-home-range" type="range" min="14" max="36" step="1"
								v-model.number="settings.binary.dotSize" />
							<span class="ez-home-range-value">{{ settings.binary.dotSize }} px</span>
						</div>
					</div>
					<div class="ez-home-settings-row">
						<label class="ez-home-settings-label" for="ez-binary-text-size">标题字号</label>
						<div class="ez-home-range-control">
							<input id="ez-binary-text-size" class="ez-home-range" type="range" min="0" max="60" step="1"
								v-model.number="settings.binary.textSize" />
							<span class="ez-home-range-value">{{ settings.binary.textSize === 0 ? '自动' :
								settings.binary.textSize + ' px' }}</span>
						</div>
					</div>
					<div class="ez-home-settings-row">
						<label class="ez-home-settings-label" for="ez-binary-text-spacing">标题间距</label>
						<div class="ez-home-range-control">
							<input id="ez-binary-text-spacing" class="ez-home-range" type="range" min="0" max="100"
								step="1" v-model.number="settings.binary.textSpacing" />
							<span class="ez-home-range-value">{{ settings.binary.textSpacing }} px</span>
						</div>
					</div>
				</template>

				<!-- 翻页时钟配置 -->
				<template v-if="settings.clockType === 'flip'">
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示模式</span>
						<div class="ez-home-segment">
							<button type="button" :class="{ active: settings.flip.mode === 'clock' }"
								@click="settings.flip.mode = 'clock'">时钟</button>
							<button type="button" :class="{ active: settings.flip.mode === 'countdown' }"
								@click="settings.flip.mode = 'countdown'">倒计时</button>
						</div>
					</div>
					<div v-if="settings.flip.mode === 'countdown'" class="ez-home-settings-row">
						<span class="ez-home-settings-label">目标时间</span>
						<input class="ez-home-datetime" type="datetime-local" v-model="settings.flip.targetDate" />
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示秒</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.flip.showSeconds ? 'true' : 'false'"
							@click="settings.flip.showSeconds = !settings.flip.showSeconds">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
					<div class="ez-home-settings-row">
						<span class="ez-home-settings-label">显示单位标签</span>
						<button class="ez-home-switch" type="button" role="switch"
							:aria-checked="settings.flip.showLabels ? 'true' : 'false'"
							@click="settings.flip.showLabels = !settings.flip.showLabels">
							<span class="ez-home-switch-slider"></span>
						</button>
					</div>
				</template>

				<!-- 缩放尺寸（各时钟通用） -->
				<div class="ez-home-settings-row">
					<label class="ez-home-settings-label" for="ez-clock-zoom">缩放尺寸</label>
					<div class="ez-home-range-control">
						<input id="ez-clock-zoom" class="ez-home-range" type="range" min="0.6" max="2.4" step="0.05"
							v-model.number="currentZoom" />
						<span class="ez-home-range-value">{{ currentZoom.toFixed(2) }}</span>
					</div>
				</div>

				<p class="ez-home-settings-tip">设置自动保存并永久生效 · Ctrl+E+Z 或 Esc 返回</p>
			</section>
		</transition>
	</div>
</template>

<script>
import ezFlipClock from '@/components/FlipClock.vue';
import { loadSettings, saveSettings, resetSettings } from '@/utils/localConfig.js';

export default {
	name: 'ezHome',
	components: {
		ezFlipClock
	},
	data() {
		return {
			// 配置模式开关：仅会话内状态，由 Ctrl+E+Z 唤起/关闭，页面始终以沉浸模式初始化
			configOpen: false,
			// 当前按住的按键集合，用于检测 Ctrl+E+Z 组合键
			heldKeys: [],
			// 界面本地配置：默认配置 + localStorage 覆盖
			settings: loadSettings(),
			// 数字时钟主题选项
			digitalThemeList: [
				{ value: 'fx67ll', label: 'fx67ll', color: '#2ecc71' },
				{ value: 'aurora', label: '极光青', color: '#2dd4bf' },
				{ value: 'ocean', label: '深海蓝', color: '#22d3ee' },
				{ value: 'forest', label: '森林绿', color: '#4ade80' },
				{ value: 'sunset', label: '日落橙', color: '#fb923c' },
				{ value: 'violet', label: '星云紫', color: '#a78bfa' },
				{ value: 'graphite', label: '石墨灰', color: '#64748b' }
			],
			// 常用 IANA 时区；保持选项精简，避免设置面板变成地区目录
			timeZoneList: [
				{ value: 'Asia/Shanghai', label: '北京时间' },
				{ value: 'Asia/Tokyo', label: '东京时间' },
				{ value: 'Europe/London', label: '伦敦时间' },
				{ value: 'America/New_York', label: '纽约时间' },
				{ value: 'UTC', label: 'UTC' }
			]
		};
	},
	computed: {
		digitalThemeRows() {
			return [this.digitalThemeList.slice(0, 4), this.digitalThemeList.slice(4)];
		},
		// 当前时钟的缩放值：读写统一代理到对应时钟的 zoom 配置
		currentZoom: {
			get() {
				return this.settings[this.settings.clockType].zoom;
			},
			set(val) {
				this.settings[this.settings.clockType].zoom = val;
			}
		}
	},
	watch: {
		// 任意配置修改后立即持久化到本地
		settings: {
			handler(val) {
				saveSettings(val);
			},
			deep: true
		}
	},
	mounted() {
		window.addEventListener('keydown', this.handleKeydown);
		window.addEventListener('keyup', this.handleKeyup);
		window.addEventListener('blur', this.clearHeldKeys);
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.handleKeydown);
		window.removeEventListener('keyup', this.handleKeyup);
		window.removeEventListener('blur', this.clearHeldKeys);
	},
	methods: {
		// 组合键检测：Ctrl（或 Mac 的 Cmd）+ E + Z 三键同时按住时切换配置模式
		handleKeydown(e) {
			var target = e.target;
			var tag = target && target.tagName ? target.tagName.toLowerCase() : '';
			// 输入控件内不响应快捷键
			if (tag === 'input' || tag === 'textarea' || (target && target.isContentEditable)) {
				return;
			}
			var key = e.key ? e.key.toLowerCase() : '';
			if (!key) {
				return;
			}
			if (this.heldKeys.indexOf(key) === -1) {
				this.heldKeys.push(key);
			}
			// 阻止浏览器默认行为（如 Ctrl+E 聚焦地址栏），保证组合键能被页面捕获
			if ((e.ctrlKey || e.metaKey) && (key === 'e' || key === 'z')) {
				e.preventDefault();
			}
			var held = this.heldKeys;
			var hasCtrl = held.indexOf('control') !== -1 || held.indexOf('meta') !== -1;
			if (hasCtrl && held.indexOf('e') !== -1 && held.indexOf('z') !== -1) {
				this.clearHeldKeys();
				this.configOpen = !this.configOpen;
				return;
			}
			if (e.key === 'Escape' && this.configOpen) {
				this.configOpen = false;
			}
		},
		handleKeyup(e) {
			var key = e.key ? e.key.toLowerCase() : '';
			var index = this.heldKeys.indexOf(key);
			if (index !== -1) {
				this.heldKeys.splice(index, 1);
			}
		},
		clearHeldKeys() {
			this.heldKeys = [];
		},
		// 恢复默认配置：清除 localStorage 后重置为内置默认值
		resetLocalSettings() {
			this.settings = resetSettings();
		}
	}
};
</script>

<style lang="less" scoped>
.ez-home {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	// 固定为视口高度：无论时钟缩放到多大都保持居中，超出部分两侧均匀裁剪
	height: 100vh;
	box-sizing: border-box;
	padding: 24px 20px 40px;
	overflow: hidden;
	// 极简清新浅色背景
	background: linear-gradient(160deg, #f7fafc 0%, #eef4f8 55%, #e8f1ee 100%);
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;

	// 配置模式下轻微软化背景，突出悬浮面板
	&.ez-home--config .ez-home-stage {
		filter: blur(2px);
		transition: filter 0.25s ease;
	}
}

.ez-home-stage {
	position: relative;
	z-index: 1;
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 0;
	transition: filter 0.25s ease;
}

.ez-home-clock-area {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-height: 0;
	overflow: hidden;

	.ez-home-clock-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
}

// 快捷键提示：左下角广告式小字，低调不抢视线
.ez-home-hint {
	position: absolute;
	bottom: 10px;
	left: 12px;
	z-index: 1;
	margin: 0;
	font-size: 10px;
	letter-spacing: 0.5px;
	color: #b8c4cf;
	user-select: none;
}

// 页脚组件在浅色首页中的定位与字号微调
/deep/ .fx67ll-footer {
	position: absolute;
	bottom: 0;
	font-size: 12px;
	padding: 8px 0;
}

// 悬浮设置面板
.ez-home-panel {
	position: fixed;
	top: 24px;
	right: 24px;
	z-index: 20;
	width: 300px;
	max-height: calc(100vh - 48px);
	box-sizing: border-box;
	padding: 18px 18px 14px;
	overflow-y: auto;
	border-radius: 16px;
	background: rgba(255, 255, 255, 0.92);
	backdrop-filter: blur(12px);
	box-shadow: 0 12px 40px rgba(44, 62, 80, 0.16);
}

.ez-home-panel-head {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 10px;

	.ez-home-panel-title {
		flex: 1;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 1px;
		color: #3d4f5f;
	}

	.ez-home-panel-reset {
		padding: 4px 12px;
		border: 1px solid #e3eaf1;
		border-radius: 999px;
		background: transparent;
		font-size: 12px;
		color: #8494a4;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			border-color: #42b983;
			color: #42b983;
		}
	}

	.ez-home-panel-close {
		width: 24px;
		height: 24px;
		padding: 0;
		border: none;
		border-radius: 50%;
		background: transparent;
		font-size: 16px;
		line-height: 24px;
		color: #9aa7b3;
		cursor: pointer;
		transition: all 0.2s;

		&:hover {
			background: #eef3f7;
			color: #3d4f5f;
		}
	}
}

.ez-home-settings-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	padding: 9px 0;

	.ez-home-settings-label {
		flex-shrink: 0;
		font-size: 13px;
		color: #5c6c7c;
	}

	&.ez-home-settings-row--stacked {
		align-items: flex-start;
		flex-direction: column;
		gap: 8px;
	}

	.ez-home-range-control {
		display: flex;
		align-items: center;
		gap: 10px;

		.ez-home-range {
			width: 120px;
			height: 4px;
			appearance: none;
			border-radius: 999px;
			background: #e3eaf1;
			outline: none;
			cursor: pointer;

			// 滑块样式（Chrome / Safari）
			&::-webkit-slider-thumb {
				appearance: none;
				width: 14px;
				height: 14px;
				border: 2px solid #ffffff;
				border-radius: 50%;
				background: #42b983;
				box-shadow: 0 1px 4px rgba(66, 185, 131, 0.4);
				cursor: pointer;
			}

			// 滑块样式（Firefox）
			&::-moz-range-thumb {
				width: 12px;
				height: 12px;
				border: 2px solid #ffffff;
				border-radius: 50%;
				background: #42b983;
				cursor: pointer;
			}
		}

		.ez-home-range-value {
			width: 46px;
			font-size: 12px;
			text-align: right;
			color: #8494a4;
			font-variant-numeric: tabular-nums;
		}
	}
}

.ez-home-segment {
	display: flex;
	padding: 3px;
	border-radius: 999px;
	background: #eef3f7;

	button {
		padding: 5px 14px;
		border: none;
		border-radius: 999px;
		background: transparent;
		font-size: 12px;
		color: #7b8b9a;
		cursor: pointer;
		transition: all 0.2s;

		&.active {
			background: #ffffff;
			color: #42b983;
			box-shadow: 0 1px 4px rgba(44, 62, 80, 0.12);
		}
	}
}

// 主题色点（紧凑风格，仅色点 + 悬停提示）
.ez-home-theme-list {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 6px;
	width: 100%;

	.ez-home-theme-row {
		display: flex;
		justify-content: center;
		gap: 6px;
		width: 100%;
	}

	.ez-home-theme-swatch {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		width: 58px;
		height: 28px;
		padding: 0 5px;
		border: 1px solid transparent;
		border-radius: 999px;
		background: #f3f6f8;
		cursor: pointer;
		transition: all 0.2s;

		.ez-home-theme-dot {
			flex-shrink: 0;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
		}

		.ez-home-theme-name {
			overflow: hidden;
			font-size: 10px;
			line-height: 1;
			color: #687888;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&.active {
			border-color: #42b983;
			background: #ffffff;
			box-shadow: 0 1px 4px rgba(44, 62, 80, 0.1);

			.ez-home-theme-name {
				color: #27875d;
			}
		}

		&:hover {
			transform: scale(1.1);
		}
	}
}

.ez-home-select {
	max-width: 150px;
	padding: 5px 28px 5px 10px;
	border: 1px solid #dce5ec;
	border-radius: 8px;
	background: #ffffff;
	font-size: 12px;
	color: #526373;
	outline: none;
	cursor: pointer;

	&:focus {
		border-color: #42b983;
		box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.12);
	}
}

.ez-home-switch {
	position: relative;
	width: 42px;
	height: 24px;
	padding: 0;
	border: none;
	border-radius: 999px;
	background: #dde6ee;
	cursor: pointer;
	transition: background 0.25s;

	.ez-home-switch-slider {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: #ffffff;
		box-shadow: 0 1px 3px rgba(44, 62, 80, 0.25);
		transition: transform 0.25s;
	}

	&[aria-checked='true'] {
		background: #42b983;

		.ez-home-switch-slider {
			transform: translateX(18px);
		}
	}
}

.ez-home-datetime {
	padding: 5px 10px;
	border: 1px solid #e3eaf1;
	border-radius: 8px;
	background: #ffffff;
	font-size: 12px;
	color: #3d4f5f;
	outline: none;

	&:focus {
		border-color: #42b983;
	}
}

.ez-home-settings-tip {
	margin: 10px 0 0;
	font-size: 12px;
	color: #9aa7b3;
}

// 悬浮面板浮现动画
.ez-home-pop-enter-active,
.ez-home-pop-leave-active {
	transition: all 0.22s ease;
}

.ez-home-pop-enter,
.ez-home-pop-leave-to {
	opacity: 0;
	transform: translateY(-8px) scale(0.97);
}

// 时钟切换淡入淡出动画
.ez-home-fade-enter-active,
.ez-home-fade-leave-active {
	transition: opacity 0.2s ease;
}

.ez-home-fade-enter,
.ez-home-fade-leave-to {
	opacity: 0;
}

// 移动端适配
@media screen and (max-width: 768px) {
	.ez-home {
		padding: 16px 14px 88px;
	}

	.ez-home-panel {
		top: 12px;
		right: 12px;
		left: 12px;
		width: auto;
		max-height: calc(100vh - 24px);
	}

	.ez-home-settings-row {
		flex-direction: column;
		align-items: flex-start;
		gap: 8px;
	}

	.ez-home-theme-list {
		align-items: flex-start;

		.ez-home-theme-row {
			justify-content: flex-start;
		}
	}

	.ez-home-range-control {
		width: 100%;

		.ez-home-range {
			flex: 1;
			width: auto;
		}
	}
}
</style>
