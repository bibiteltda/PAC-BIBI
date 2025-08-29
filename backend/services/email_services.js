// Lucas irá implementar a lógica real de envio de e-mail aqui.

exports.enviarCodigoVerificacao = async (email, codigo) => {
  console.log("====================================");
  console.log("SIMULADOR DE ENVIO DE E-MAIL");
  console.log(`Para: ${email}`);
  console.log(`Código de Verificação: ${codigo}`);
  console.log("====================================");
  
  // Por enquanto, apenas retornamos uma promessa resolvida.
  return Promise.resolve();
};