- emissão de documentos SST

	- emissão de certificados
		- cadastrar instrutores
			- nome
			- cargo

		- cadastrar certificado
			- título do certificado
			- carga horária

		- emitir certificado
			- título do certificado
			- carga horária
			- nome do participante
			- data do treinamento
			- instrutor (dropdown instrutores)

	- cadastro setor
		- setor (text)

	- cadastro função
		- nome função (text)
		- cbo  (number, formato XXXX OU XXXX-XX)

	- cadastro OS
		- setor (dropdown sql)
		- nome função (dropdown sql)
		- cbo (sql)
		- descrição da função (textarea)
		- riscos associados às atividades (textarea)
		- EPIs recomendados (textarea)
		- medidas preventitas (recomendações) (textarea)
		- procedimentos em caso de acidente (textarea)
		- observações (textarea)
		- termo de responsabilidade (textarea)

	- emitir OS
		- setor (dropdown sql)
		- função (dropdown sql das funções que estão dentro do setor)
		- botão filtrar
		- código (number)
		- nome (text char45)
		- data da ordem (date)