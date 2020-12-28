#! /bin/ksh
echo -e "\t\t\n\n🔥🔥🔥🔥\n\033[1;33mJin's autopush\033[0m \n🔥🔥🔥🔥\n"
echo -e "\033[1;32mWanna push? [y/n]: \033[0m"
read  word

value="y"
cancled="n"

if [ ${value} = $word ];then

    git add .
    git status
    echo -e "\033[1;32mType commit message\033[0m"
    read commit
    git commit -m $commit
    git push
    echo -e "\n\t\t\033[1;32mDone!\033[0m\n"

elif [ ${value} != $word ];then

    cancled="y"

fi

if [ ${cancled} = "y" ];then

    echo -e "\033[1;31mCancled\033[0m"


fi
