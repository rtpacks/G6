import type { G6Spec } from '../../../src';
import { DataController } from '../../../src/runtime/data';
import { ElementController } from '../../../src/runtime/element';
import type { RuntimeContext } from '../../../src/runtime/types';
import { Graph } from '../../mock';
import type { StaticTestCase } from '../types';

const createContext = (canvas: any, options: G6Spec): RuntimeContext => {
  const model = new DataController();
  model.setData(options.data || {});
  return {
    canvas,
    graph: new Graph() as any,
    options,
    model,
  };
};

export const controllerElementPosition: StaticTestCase = async (context) => {
  const { canvas, animation } = context;

  const options: G6Spec = {
    data: {
      nodes: [
        { id: 'node-1', style: { x: 250, y: 200 } },
        { id: 'node-2', style: { x: 250, y: 200 } },
        { id: 'node-3', style: { x: 250, y: 200 } },
        { id: 'node-4', style: { x: 250, y: 200 } },
        { id: 'node-5', style: { x: 250, y: 200 } },
        { id: 'node-6', style: { x: 250, y: 200 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2' },
        { source: 'node-2', target: 'node-3' },
        { source: 'node-3', target: 'node-1' },
        { source: 'node-3', target: 'node-5' },
        { source: 'node-2', target: 'node-4' },
        { source: 'node-2', target: 'node-5' },
        { source: 'node-3', target: 'node-6' },
        { source: 'node-4', target: 'node-5' },
        { source: 'node-5', target: 'node-6' },
      ],
    },
    theme: 'light',
    node: {
      style: {
        width: 20,
        height: 20,
      },
      animation: animation && {},
    },
    edge: {
      style: {},
      animation: animation && {},
    },
  };

  const elementContext = createContext(canvas, options);

  const elementController = new ElementController(elementContext);

  const result = await elementController.render(elementContext);

  await result?.finished;

  elementController.updateNodeLikePosition(
    {
      'node-1': [250, 100],
      'node-2': [175, 200],
      'node-3': [325, 200],
      'node-4': [100, 300],
      'node-5': [250, 300],
      'node-6': [400, 300],
    },
    animation,
  );

  await elementController.render(elementContext);
};