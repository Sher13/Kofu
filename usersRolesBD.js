exports.name='userRolesBD:';
exports.system={
     DISABLE:false,
     DATA_BASE_NAME:'test_bd.bd',
     TABLE_NAME:'users_roles16',
     SERVER_ID:'437647330406039572'
};
exports.run=async(client,message,args)=>{
   if(message.guild.id!=module.exports.system.SERVER_ID){message.channel.send('Wrong server!'); return;};
   if(message.content.search('enable')!=-1){module.exports.system.DISABLE=false; message.channel.send(' is enabled now'); return; };
   if(message.content.search('disable')!=-1){module.exports.system.DISABLE=true; message.channel.send(' is disabled now'); return; };
   if(module.exports.system.DISABLE) { message.channel.send('disabled!'); return;};
 
   if(message.content.search('test')!=-1) {
          console.log('usersRoleBD test:' ); 
          console.log('insert: ');
          await module.exports.insert(client,message.member);
          console.log('set: ');
          await module.exports.set(client,message.member);
    }else

    if(message.content.search('scan')!=-1){
       console.log('usersRoleBD scan:' ); 
        let mmb_arr =await message.guild.fetchMembers().then(members=>{return members;}).catch(err=>{console.error(err);});
        mmb_arr=mmb_arr.members.array();
       for(var i = 0; i< mmb_arr.length;i++){
                   await module.exports.insert(client,mmb_arr[i]);
        };
     

    };//
    
};//run end
exports.set = async(client,member)=>{
      if(member.guild.id!=module.exports.system.SERVER_ID){console.log('Wrong server!');return;};
      if(module.exports.system.DISABLE) { console.log('disabled!'); return;};
try{

    let log = (arg) => {console.log(module.exports.name+'set:'+arg);};
    const fs = require('fs');
    const sqlite = require('aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
    
    async function process(){
       
       try{
     let resolve='';   
     await sqlite.open('./$DATA_BASE_NAME').catch(err=>console.log(err));
    
     resolve = await sqlite.get(`SELECT * FROM ${TABLE_NAME}  WHERE userID=='${member.user.id}'`).then(row=>{return (row)?row:false;}).catch(err=>{console.log(err);});
     if(!resolve) return;
     log('resolve ');
     console.log(resolve);
     let arr =  resolve.rolesIDS.split(','); 
     log('arr '+ arr);
     let role='';
     for(var i=0;i<arr.length;i++){
           
           role = await member.guild.roles.get(arr[i]);
           if(role && role.name!='@everyone') await member.addRole(role).then(log(role.id+' '+role.name+' role add to '+member.user.username +' member' )).catch(err=>console.log(err));
  
      };//for end
     return true;
         }catch(err){console.log(err);};
     };//process end
     await  process();
}catch(err){log(err);};
};//get end


exports.insert = async(client,member)=>{
      if(member.guild.id!=module.exports.system.SERVER_ID){console.log('Wrong server!');return;};
      if(module.exports.system.DISABLE) {console.log('disabled!'); return;};
try{
    let log = (arg) => {console.log(module.exports.name+'insert:'+arg);};
    const fs = require('fs');
    const sqlite = require('aa-sqlite');
    const DATA_BASE_NAME=module.exports.system.DATA_BASE_NAME;
    const TABLE_NAME = module.exports.system.TABLE_NAME;
   
    async function getRolesIDS(){
       let rolesIDS = await member.roles.keyArray().join(',');
       log(' rolesIDS: '+rolesIDS);
       return rolesIDS;
   };//getRolesIds end

   async function process(){
    let rolesIDS = await getRolesIDS(); 
    let user_rolesIDS=rolesIDS;
    await sqlite.open('./$DATA_BASE_NAME').catch(err=>console.log(err));

   let resolve=await sqlite.get(`SELECT * FROM ${TABLE_NAME} WHERE userID=='${member.user.id}'`).then(raw=>{ return (raw)?'has':'apsend';}).catch(err=>{console.log(err);});
   let resolve = await sqlite.get(`SELECT * FROM ${TABLE_NAME} WHERE userID=='${member.user.id}'`).then(raw=>{return (raw)? 'has':'apsend' }).catch(err=>console.log(err);); 
         await sqlite.get(`SELECT `);  


     log(member.user.username +' member '+resolve+' into table'); //
  if(resolve=='has'){
    resolve = await sqlite.run(`UPDATE ${TABLE_NAME} SET rolesIDS=='${user_rolesIDS}' WHERE userID=='${member.user.id}'`).catch(err=>{console.log(err);});
     log(member.user.username + ' member info is updated');
   }else if(resolve=='absend'){
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (userID,rolesIDS) VALUES('${member.user.id}','${user_rolesIDS}')`).catch(err=>{console.log(err)});
     log(member.user.username + ' member info inserted into table');
   }else{
     await sqlite.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (userID TEXT PRIMARY KEY, rolesIDS TEXT)`).then(r=>{return true;}).catch(err=>{console.log(err);});
     log(' table created');
     await sqlite.run(`INSERT INTO ${TABLE_NAME} (userID,rolesIDS) VALUES('${member.user.id}','${user_rolesIDS}')`).then(r=>{return true;}).catch(err=>{console.log(err);});  
     log(member.user.username + ' member info inserted into table');
    };//else end

    let table = await sqlite.get(`SELECT * FROM ${TABLE_NAME} WHERE userID=='${member.user.id}'`).then(table=>{return table;}).catch(err=>{console.log(err);});
    log('table: ');
    console.log(table);

 };//process end

 await process();
          
}catch(err){console.log(err)};
};//exports.insert end

