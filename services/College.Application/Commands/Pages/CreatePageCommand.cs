using MediatR;

namespace College.Application.Commands.Pages;

public class CreatePageCommand : IRequest
{
}

public class CreatePageCommandHandler : IRequestHandler<CreatePageCommand>
{
	public async Task Handle(CreatePageCommand request, CancellationToken cancellationToken)
	{
		throw new NotImplementedException();
	}
}