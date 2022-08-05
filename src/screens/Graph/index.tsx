import { Box, Text, useTheme } from '@app/theme';
import {
  Canvas,
  Line,
  Path,
  runTiming,
  Skia,
  SkPath,
  useComputedValue,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import { scaleLinear, scaleTime, line, curveBasis } from 'd3';
import React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';

import {
  animatedData,
  animatedData2,
  animatedData3,
  DataPoint,
  originalData,
} from './data';

const { width } = Dimensions.get('window');

interface GraphData {
  min: number;
  max: number;
  curve: SkPath;
}
const HEIGHT = 400;
const WIDTH = width;

const Graph = () => {
  const { colors } = useTheme();
  const isTransitionCompleted = useValue(1);
  const transitionState = useValue({
    currentChart: 0,
    nextChart: 1,
  });

  const lines = [
    {
      p1: vec(10, 130),
      p2: vec(400, 130),
    },
    {
      p1: vec(10, 250),
      p2: vec(400, 250),
    },
    {
      p1: vec(10, 370),
      p2: vec(400, 370),
    },
  ];

  const buildGraphData = (data: DataPoint[]): GraphData => {
    const min = Math.min(...data.map((point) => point.value));
    const max = Math.max(...data.map((point) => point.value));
    const getYAxis = scaleLinear().domain([3, max]).range([HEIGHT, 35]);
    const getXAxis = scaleTime()
      .domain([new Date(2000, 1, 1), new Date(2000, 1, 15)])
      .range([10, WIDTH - 10]);

    const curvedLine = line<DataPoint>()
      .x((d) => getXAxis(new Date(d.date)))
      .y((d) => getYAxis(d.value))
      .curve(curveBasis)(data);

    const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

    return {
      min,
      max,
      curve: skPath!,
    };
  };

  const graph = [
    buildGraphData(originalData),
    buildGraphData(animatedData),
    buildGraphData(animatedData3),
    buildGraphData(animatedData2),
  ];

  const currentPath = useComputedValue(() => {
    const start = graph[transitionState.current.currentChart].curve;
    const end = graph[transitionState.current.nextChart].curve;
    const result = start.interpolate(end, isTransitionCompleted.current);

    return result?.toSVGString() ?? '';
  }, [transitionState, isTransitionCompleted]);

  const transition = (target: number) => {
    transitionState.current = {
      currentChart: target,
      nextChart: transitionState.current.currentChart,
    };

    isTransitionCompleted.current = 0;

    runTiming(isTransitionCompleted, 1, {
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  return (
    <Box flex={1} backgroundColor="primary">
      <Canvas
        style={{
          height: HEIGHT,
          width: WIDTH,
        }}
      >
        {lines.map((_line) => (
          <Line strokeWidth={1} color="lightGray" p1={_line.p1} p2={_line.p2} />
        ))}
        <Path
          path={currentPath}
          color={colors.danger}
          strokeWidth={4}
          style="stroke"
        />
      </Canvas>
      <Box
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
      >
        <TouchableOpacity onPress={() => transition(1)}>
          <Box padding="l" backgroundColor="danger" borderRadius="l">
            <Text color="primaryLight" fontWeight="700">
              One
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => transition(0)}>
          <Box padding="l" backgroundColor="danger" borderRadius="l">
            <Text color="primaryLight" fontWeight="700">
              Two
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => transition(2)}>
          <Box padding="l" backgroundColor="danger" borderRadius="l">
            <Text color="primaryLight" fontWeight="700">
              Three
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => transition(3)}>
          <Box padding="l" backgroundColor="danger" borderRadius="l">
            <Text color="primaryLight" fontWeight="700">
              Four
            </Text>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default Graph;
