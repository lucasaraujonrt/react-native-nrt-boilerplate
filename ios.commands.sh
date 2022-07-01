#!/bin/bash
# exit when any command fails
set -e

COMMAND=$1

function clean() {
    printf "🧹 Cleaning.. \n"
    rm -rf ~/Library/Caches/CocoaPods Pods ~/Library/Developer/Xcode/DerivedData
    rm -rf node_modules ios/build ios/Pods ios/Podfile.lock
    yarn cache clean
    printf "✅ Cleaning finished! \n"
}

function install_dependencies() {
    printf "👨‍💻 Installing dependencies.. \n"
    yarn
    cd ios
    arch_name="$(uname -m)"
    if [ "${arch_name}" = "x86_64" ]; then
        if [ "$(sysctl -in sysctl.proc_translated)" = "1" ]; then
            printf " Using arch -x86_64 to install... \n"
            arch -x86_64 pod install;
        else
            echo "Normal pod install...";
            pod install;
        fi
    elif [ "${arch_name}" = "arm64" ]; then
        printf " Using arch -x86_64 to install... \n"
        arch -x86_64 pod install;
        else
        echo "Unknown architecture: ${arch_name}"
    fi
    printf "✅ All installed correctly"
}

function setup_environment() {
    clean
    install_dependencies
}

case $COMMAND in
clean) clean ;;
install) install_dependencies ;;
setup) setup_environment ;;
*) echo "❌ Command not found" ;;
esac