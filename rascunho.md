// tentar fazer os head dinâmicos

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

	- emissão de ordem de serviço
		- cadastro setor
			- setor (text)

		- cadastro função
			- nome função (text)
			- cbo  (formato XXXX OU XXXX-XX)

		- cadastro OS
			- setor (select dropdown from sql)
			- nome função (select dropdown from sql)
			- cbo (auto from sql, disabled)
			- descrição da função (textarea)
			- riscos associados às atividades (textarea)
			- EPIs recomendados (textarea)
			- medidas preventivas (recomendações) (textarea)
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