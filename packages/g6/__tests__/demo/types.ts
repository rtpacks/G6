import type { IAnimation } from '@antv/g';
import type { Canvas } from '../../src/runtime/canvas';

type TestCaseContext = {
  canvas: Canvas;
};

export interface StaticTestCase extends BaseTestCase {
  (context: TestCaseContext): Promise<void>;
}

export interface AnimationTestCase extends BaseTestCase {
  (context: TestCaseContext): Promise<IAnimation | null>;
  /**
   * <zh/> 检查的动画时间
   *
   * <en/> Animation time to check
   */
  times: number[];
}

export interface BaseTestCase {
  only?: boolean;
  skip?: boolean;
  /**
   * <zh/> 在测试用例执行前执行的函数
   *
   * <en/> Function to be executed before the test case is executed
   * @returns
   */
  preprocess?: () => Promise<void>;
  /**
   * <zh/> 在测试用例执行后执行的函数
   *
   * <en/> Function to be executed after the test case is executed
   * @returns
   */
  postprocess?: () => Promise<void>;
}