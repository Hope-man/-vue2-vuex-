#npm  run  build 打包本地dist

#fis3 release remote 传输到服务器

#fis3 release dev 打包本地 output


#!/bin/sh


#echo "arg_num: $#"
#echo "shell_name: $0"
#echo "first_arg : $1"
#echo "second_arg : $2"
#echo "args : $@"



if [ $1 == 224 ]
   then
       sed -i '' 's/247/224/g' ./fis-conf.js
elif [ $1 == 247 ]

   then
       sed -i '' 's/224/247/g' ./fis-conf.js
else

    echo "第一个参数错误，请重新执行"
    exit;
fi


echo "success.."
npm  run  build  #打包
fis3 release remote #传输



#sed -i '' 's/247/224/g' ./fis-conf.js