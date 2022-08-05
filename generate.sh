#!/bin/bash
set -e

COMMAND=$1

function screen() {
  printf "🖥️ Creating screen... \n"
  echo "Screen name: "  
  read screen_name 
  cd src/screens
  mkdir $screen_name
  cd $screen_name

  cat <<EOF >${screen_name}.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface I${screen_name}Props {
}

const $screen_name = ({...props}: I${screen_name}Props) => {
  return (
    <View>
      <Text>$screen_name</Text>
    </View>
  );
};

export default $screen_name;
EOF

printf "✅ Screen ${screen_name} created! 🥳 \n "
printf "🥸 Dont forget to put index in /screens \n "
}

function component() {
  printf "🖥️ Creating component... \n"
  echo "Component name: "  
  read component_name
  cd src/components
  mkdir $component_name
  cd $component_name

  cat <<EOF >${component_name}.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface I${component_name}Props {
}

const $component_name = ({...props}: I${component_name}Props) => {
  return (
    <View>
      <Text>$component_name</Text>
    </View>
  );
};

export default $component_name;
EOF

printf "✅ Component ${component_name} created! 🥳 \n "
printf "🥸 Dont forget to put index in /components \n "
}


case $COMMAND in
screen) screen ;;
component) component ;;
*) echo "❌ Command not found" ;;
esac