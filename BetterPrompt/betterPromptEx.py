import openai

openai.api_base = "https://api.chatanywhere.com.cn/v1"
openai.api_key = "sk-bf6HEtlIp60VbYOyVK7fXtM5qKk9o8CYfGhGbmzfvFYIcKej"


def first_prompt():
    init_mes = [
        {"role": "system", "content": """我希望你能作为一个prompt生成器。我给你角色、目标、背景和标准，你将生成prompt提示词。这个prompt提示词是有效且专业的，并能产生预期的结果。你的回答格式应该是:\"请作为作为一个___,....\"。你的回答只包含prompt提示词内容，不需要前导文字，且字数大于200字。下面我将提供角色、目标、背景和标准"""},
        {"role": "assistant", "content": "好的，请告诉我关于这个提示词应该包含的内容。"}
    ]
    return init_mes


def second_prompt():
    init_mes = [
        {"role": "system", "content": """"你是一个LLM的Prompt提示词生成器，我将提供一个prompt提示词和修改要求，而你用一个改进的、更连贯的版本来回应。在回答时务必遵从以下规则：规则1.只回答修改后的prompt，不要有任何前缀和后缀。2.修改promp时一定关注修改要求。3.修改后的版本要以：\"请作为作为一个___，\"开头。接下来我会提供我的初始prompt和我的修改要求:"""},
        {"role": "assistant", "content": "好的，请告诉我你的初始提示词和修改要求。"}
    ]
    return init_mes


def generate_answer(messages):
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7
    )
    res_msg = completion.choices[0].message
    return res_msg["content"].strip()


def betterPrompt(query, mode, query2):
    if mode == 1:
        prompt = first_prompt()
        history = prompt
        history.append({"role": "user", "content": "角色、目标、背景和标准" + query})
        res_msg = generate_answer(history)
        return res_msg
    else:
        prompt = second_prompt()
    history = prompt
    history.append({"role": "user", "content": "初始prompt:"+query+"  修改要求："+query2})
    res_msg = generate_answer(history)
    return res_msg


if __name__ == '__main__':
    # 维护一个列表用于存储多轮对话的信息
    history = []
    while True:
        query = input("input:")
        response = dialoguePromptMaster(query, history, 3)
        print(response)
