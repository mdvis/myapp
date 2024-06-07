/**
 * name: s1.js
 * author: Deve
 * date: 2023-06-07
 */

$(function(){
    $('.ui.form')
        .form({
            fields: {
                right:{identifier:'right', rules:[{type:'empty',prompt:'请填写{name}'}] },
                user:{identifier:'user',   rules:[{type:'empty',prompt:'请填写{name}'}] },
                text:{identifier:'text',   rules:[{type:'empty',prompt:'请填写{name}'}] },
                ip:{identifier:'ip',       rules:[{type:'empty',prompt:'请填写{name}'}] },
                time:{identifier:'time',   rules:[{type:'empty',prompt:'请填写{name}'}] },
                content:{identifier:'content',   rules:[{type:'empty',prompt:'请填写{name}'}] },
            }
        });
});
