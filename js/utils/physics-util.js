/**
 * 简单的物理计算工具
 */

export const calcY = (velocityY, height) => {
  // 计算自上次更新以来经过的时间
  // 更新速度和位置
  velocityY += 0.25; // v = u + at
  height += velocityY;
  return [velocityY, height];
};
