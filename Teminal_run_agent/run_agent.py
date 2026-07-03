from veadk import Agent, Runner

app_name = "veadk_playground_app"
user_id = "veadk_playground_user"
session_id = "veadk_playground_session"

# Define the Agent
agent = Agent(
    name="TestAgent",
    description="An assistant that help users.",
    # agent prompt / instruction
    instruction="You are a helpful assistant that help users.",
)

runner = Runner(
    agent=agent, app_name=app_name, user_id=user_id
)

# Use the `run` method in the runner to call the Agent
async def main():
    response = await runner.run(
        messages="你好，请问你可以做什么？", session_id=session_id
    )
    print(response)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())